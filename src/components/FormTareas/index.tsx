// React
import { useState, useEffect } from "react";

// Librerias
import { v4 } from "uuid";

// Local Reference
import {
  useInsumoStore,
  useConceptoStore,
  useWorkingPresupuesto,
} from "../../store/projectStore";
import { useUxStore } from "../../store/uxStore";
import { setFormat } from "../../utils/CurrencyFormat";
import { Unidades } from "../../utils/SelectInputOptions";

// Types
import { Concepto, ListadoInsumos } from "../../types/Concepto";
import { Insumo } from "../../types/Insumo";

// Styles
import "./FormTareas.scss";
import dayjs from "dayjs";
import TableInsumo from "../TableInsumo";
import AnyIcon from "../AnyIcon";
import minusIcon from "../../assets/icons/bx-minus-circle.svg";

const tareaDefaultValue = {
  id: "",
  fechaCreacion: "",
  clave: "",
  descripcion: "",
  unidad: "",
  categoria: "",
  isTarea:false,
  precioProyecto: [],
  listadoInsumos: [],
  precio: 0,
};

const ErrorMsg = () => {
  return (
    <p>
      {" "}
      Error!.. verificar datos, no dejar espacios vacios o numeros negativos{" "}
    </p>
  );
};

type Props = { ConceptoId?: string };

export default function FormTareas({ ConceptoId }: Props) {
  const [editConcepto, setEditConcepto] = useState(false);
  const [formError, setFormError] = useState(false);
  const [showConceptoTable, setShowConceptoTable] = useState(false);
  const [formData, setFormData] = useState<Insumo>(tareaDefaultValue);
  const { openModalFormInsumo, openModalFormTarea } = useUxStore();
  
  const { addConceptoPartida } = useWorkingPresupuesto();
  const { insumos, addInsumo,insumoToUpdate,setInsumoToUpdate,updateInsumo } = useInsumoStore();

  console.log();
  useEffect(() => {
    if (insumoToUpdate !== undefined) {
        setFormData(insumoToUpdate);
      setEditConcepto(true);
    } else {
      setFormData({
        id: v4(),
        fechaCreacion: dayjs().format("YYYY-MM-DD, h:mm:ss A"),
        clave: "",
        descripcion: "",
        unidad: "",
        categoria: "Tareas",
        isTarea:true,
        precioProyecto:[],
        listadoInsumos: [],
        precio: 0.0,
      });
    }
  }, []);

  const data: Insumo[] = insumos;

  const onSubmit = (event: any) => {
    event.preventDefault();

    // Form Validations (No empty arrays)
    if (
      formData.clave === ""
      // formData.descripcion === "" ||
      // formData.unidad === "" ||
      // formData.listadoInsumos?.length === 0
    ) {
      console.log(formData);
      setFormError(true);
      return console.log("error de datos");
    }

    if (editConcepto) {
      updateInsumo(formData);
    } else {
      console.log('soy la data',formData)
      addInsumo(formData);
      // addConceptoPartida({
      //   conceptoId: formData.id,
      //   cantidad: 0.0,
      //   fechaCreacion: dayjs().format("YYYY-MM-DD, h:mm:ss A"),
      // });
    }

    onClear();
    setFormError(false);
    setEditConcepto(false);
    openModalFormTarea(false);
  };

  const onChange = (event: any) => {
    const dato = event?.target.value;
    setFormData({
      ...formData,
      [event.target.name]: dato,
    });
  };

  const onClear = () => {
    setFormData(tareaDefaultValue);
    setInsumoToUpdate(undefined);
  };

  const onCancel = () => {
    onClear();
    openModalFormTarea(false);
  };

  const addInputInsumo = (id: string) => {
    const oldInsumos: ListadoInsumos[] | undefined = formData.listadoInsumos;
    const newInsumo = {
      insumoId: id,
      cantidad: 0.0,
    };
    if (
      formData.listadoInsumos?.find((pu) => pu.insumoId === newInsumo.insumoId)
    ) {
      console.log("insumo ya existe");
      return;
    } else {
      setFormData({
        ...formData,
        listadoInsumos: [...(oldInsumos as []), newInsumo],
      });
    }
  };
  const onPrecioUnitario = () => {
    (formData.listadoInsumos as [])?.map((element) => {
      const insumoPu = insumoData(insumos, element);
      const total =
        Number(element["cantidad"]) * Number((insumoPu as Insumo)["precio"]);
      arrPrecioTotal.push(total);
    });
    const precioTotal = arrPrecioTotal.reduce((a, b) => a + b, 0);
    return precioTotal;
  };

  const onCantidad = (
    event: React.FormEvent<HTMLInputElement>,
    index: number
  ) => {
    const cantidad = Number((event.target as HTMLInputElement).value);
    const newArr = (formData.listadoInsumos as []).map((insumo, i) => {
      if (index === i) {
        return {
          ...(insumo as ListadoInsumos),
          [(event.target as HTMLInputElement).name]: cantidad,
        };
      } else {
        return insumo;
      }
    });
    const pUnitario: number[] = [];
    newArr.map((element) => {
      const insumoPu = insumoData(insumos, element);
      const total =
        Number(element["cantidad"]) * Number((insumoPu as Insumo)["precio"]);
      pUnitario.push(total);
    });
    const precioTotal = pUnitario.reduce((a, b) => a + b, 0);

    setFormData({
      ...formData,
      listadoInsumos: newArr,
      precio: precioTotal,
    });
  };

  // Mandar a utils
  const insumoData = (arrIsumos: Insumo[], findInsumo: ListadoInsumos) =>
    arrIsumos.find((element) => element.id === findInsumo.insumoId);

  const arrPrecioTotal: number[] = [];

  const handleAddInsumo = () => {
    console.log("Inicio");
    openModalFormInsumo(true);
    console.log("fin");
  };

  const deleteInsumo = (id: string) => {
    console.log(id);
    const oldInsumos: ListadoInsumos[] | undefined = formData.listadoInsumos;
    const newInsumos = oldInsumos?.filter((insumo) => insumo.insumoId !== id);
    setFormData({
      ...formData,
      listadoInsumos: newInsumos,
    });
  };
  return (
    <form
      className="form AddConceptoForm"
      onSubmit={(event) => onSubmit(event)}
    >
      <div className="inputRow">
        <div className="input clave">
          <label htmlFor="clave">Clave</label>
          <input
            type="text"
            name="clave"
            id="clave"
            placeholder="A001"
            onChange={(event) => onChange(event)}
            value={formData.clave}
          />
        </div>
        <div className="input descripcion">
          <label htmlFor="descripcion">Descripcion</label>
          <textarea
            // type="text"
            name="descripcion"
            id="descripcion"
            placeholder="Suministro y colocacion de ...."
            onChange={(event) => onChange(event)}
            value={formData.descripcion}
          />
        </div>
        <div className="input unidad">
          <label htmlFor="unidad">Unidad</label>
          <select
            name="unidad"
            id="unidad"
            onChange={(event) => onChange(event)}
            value={formData.unidad}
          >
            <option value="m2"></option>
            {Unidades.map((unidad) => {
              return (
                <option value={unidad.simbol} key={unidad.name}>
                  {unidad.simbol}
                </option>
              );
            })}
          </select>
        </div>
        <div className="input precio">
          <label htmlFor="unidad">Precio</label>
          <p>{setFormat(onPrecioUnitario())}</p>
        </div>
      </div>
      <div className="inputInsumos">
        {(formData.listadoInsumos as ListadoInsumos[])?.length > 0 ? (
          <table className="tableDefault tableInputInsumos">
            <thead>
              <tr>
                <th>Clave</th>
                <th>Descripcion</th>
                <th>Unidad</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {formData.listadoInsumos?.map((insumo, index) => {
                const insumoPU: any = insumoData(insumos, insumo);

                return (
                  <tr key={insumo.insumoId}>
                    <td className="clave">{insumoPU.clave}</td>
                    <td className="descripcion">{insumoPU.descripcion}</td>
                    <td className="unidad">{insumoPU.unidad}</td>
                    <td className="cantidad">
                      <input
                        type="number"
                        name="cantidad"
                        id="cantidad"
                        onChange={(event) => onCantidad(event, index)}
                        value={insumo.cantidad}
                      />
                    </td>
                    <td className="precio">{setFormat(insumoPU.precio)}</td>

                    <td className="total">
                      {setFormat(insumoPU.precio * insumo.cantidad)}
                    </td>
                    <td className="actions">
                      <button
                        className="minusBtn"
                        onClick={() => deleteInsumo(insumo.insumoId)}
                        type="button"
                      >
                        <AnyIcon iconSrc={minusIcon} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : undefined}
      </div>

      {formError && <ErrorMsg />}
      <div className="btn-group">
        <button type="button" onClick={onCancel} className="cancelBtn">
          Cancelar
        </button>
        <button type="submit" className="successBtn">
          Guardar
        </button>
      </div>
      <div className="tableInsumo">
        <hr />
        <div className="tableInsumoHeader">
          <h3>Listado de Insumos</h3>
          <div className="insumosButtons">
            <button
              type="button"
              onClick={() => setShowConceptoTable(!showConceptoTable)}
            >
              Cargar Insumo
            </button>
            <button type="button" onClick={handleAddInsumo}>
              Agregar Insumo
            </button>
          </div>
        </div>
        {showConceptoTable ? (
          <div className="InsumoAddList">
            <TableInsumo insumosData={data} addInputInsumo={addInputInsumo} />
          </div>
        ) : null}
      </div>
    </form>
  );
}
