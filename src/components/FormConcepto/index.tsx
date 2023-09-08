// React
import { useState, useEffect } from "react";

// Librerias
import { v4 } from "uuid";

// Local Reference
import { useInsumoStore, useConceptoStore, useWorkingPresupuesto } from "../../store/projectStore";
import { useUxStore } from "../../store/uxStore";
import { setFormat } from "../../utils/CurrencyFormat";
import { Unidades } from "../../utils/SelectInputOptions";
import TableTabsAddConcepto from "../TableTabsAddConcepto";

// Types
import type { TableProps } from "antd";
import type {
  ColumnsType,
  FilterValue,
  SorterResult,
} from "antd/es/table/interface";
import { Concepto, ListadoInsumos } from "../../types/Concepto";
import { Insumo } from "../../types/Insumo";

// Styles
import "./FormConcepto.scss";
import dayjs from "dayjs";

const conceptoDefaultValue = {
  id: "",
  proyectoId: "",
  fechaCreacion: "",
  clave: "",
  descripcion: "",
  unidad: "",
  listadoInsumos: [],
  precioUnitario:0
};

const ErrorMsg = () => {
  return (
    <p>
      {" "}
      Error!.. verificar datos, no dejar espacios vacios o numeros negativos{" "}
    </p>
  );
};

export default function FormConcepto({ ProjectId }: any) {
  const [editConcepto, setEditConcepto] = useState(false);
  const [formError, setFormError] = useState(false);
  const [showConceptoTable, setShowConceptoTable] = useState(false);
  const [formData, setFormData] = useState<Concepto>(conceptoDefaultValue);
  const { openModalFormConcepto } = useUxStore();
  const { addConcepto, conceptoToUpdate, setConceptoToUpdate, updateConcepto } =
    useConceptoStore();
  const {addConceptoPartida}= useWorkingPresupuesto()
  const { insumos } = useInsumoStore();

  // console.log("to update:", conceptoToUpdate);
  // console.log("projectId:", ProjectId);
  // console.log("formData:", formData);

  useEffect(() => {
    if (conceptoToUpdate !== undefined) {
      setFormData(conceptoToUpdate);
      setEditConcepto(true);
    } else {
      setFormData({
        id: v4(),
        proyectoId: ProjectId,
        fechaCreacion: dayjs().format("YYYY-MM-DD, h:mm:ss A"),
        clave: "",
        descripcion: "",
        unidad: "",
        listadoInsumos: [],
        precioUnitario:0
      });
    }
  }, []);

  //TEST
  const data: Insumo[] = insumos;

  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<SorterResult<Insumo>>({});

  const handleChange: TableProps<Insumo>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter as SorterResult<Insumo>);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const setAgeSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "age",
    });
  };

  const columns: ColumnsType<Insumo> = [
    {
      title: "Clave",
      dataIndex: "clave",
      key: "clave",
      //   filteredValue: filteredInfo.name || null,
      //   onFilter: (value: string, record) => record.name.includes(value),
      //   sorter: (a, b) => a.name.length - b.name.length,
      //   sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      //   ellipsis: true,
    },
    {
      title: "Descripcion",
      dataIndex: "descripcion",
      key: "descripcion",
      //   sorter: (a, b) => a.age - b.age,
      //   sortOrder: sortedInfo.columnKey === 'age' ? sortedInfo.order : null,
      //   ellipsis: true,
    },
    {
      title: "Unidad",
      dataIndex: "unidad",
      key: "unidad",
      //   filters: [
      //     { text: 'London', value: 'London' },
      //     { text: 'New York', value: 'New York' },
      //   ],
      //   filteredValue: filteredInfo.address || null,
      //   onFilter: (value: string, record) => record.address.includes(value),
      //   sorter: (a, b) => a.address.length - b.address.length,
      //   sortOrder: sortedInfo.columnKey === 'address' ? sortedInfo.order : null,
      //   ellipsis: true,
    },
    {
      title: "Precio",
      dataIndex: "precio",
      key: "precio",
      render: (_, record) => <p>{setFormat(record.precio)}</p>,
    },
    {
      title: "",
      key: "action",
      width: "15%",
      render: (_, record) => {
        return (
          <button type="button" onClick={() => addInputInsumo(record.id)}>
            agregar
          </button>
        );
      },
    },
  ];

  //Test

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
      updateConcepto(formData);
    } else {
      addConcepto(formData);
      addConceptoPartida({conceptoId:formData.id, cantidad:0, fechaCreacion:dayjs().format("YYYY-MM-DD, h:mm:ss A") })
    }

    onClear();
    setFormError(false);
    setEditConcepto(false);
    openModalFormConcepto(false);
  };

  const onChange = (event: any) => {
    const dato = event?.target.value;
    setFormData({
      ...formData,
      [event.target.name]: dato,
    });
  };

  const onClear = () => {
    setFormData(conceptoDefaultValue);
    setConceptoToUpdate(undefined);
  };

  const onCancel = () => {
    onClear();
    openModalFormConcepto(false);
  };

  const addInputInsumo = (id: string) => {
    const oldInsumo: ListadoInsumos[] | undefined = formData.listadoInsumos;
    const newInsumo = {
      insumoId: id,
      cantidad: 0,
    };
    if (
      formData.listadoInsumos?.find((pu) => pu.insumoId === newInsumo.insumoId)
    ) {
      console.log("insumo ya existe");
      return;
    } else {
      setFormData({
        ...formData,
        listadoInsumos: [...(oldInsumo as []), newInsumo],
      });
    }
  };
  const onPrecioUnitario =( )=>{
      (formData.listadoInsumos as [])?.map((element) => {
    const insumoPu = insumoData(insumos, element);
    const total =
      Number(element["cantidad"]) * Number((insumoPu as Insumo)["precio"]);
    arrPrecioTotal.push(total);
  });
  const precioTotal = arrPrecioTotal.reduce((a, b) => a + b, 0);
  return precioTotal  
}

  const onCantidad = (event: any, index: number) => {
    const cantidad = Number(event.target.value);
    const newArr = (formData.listadoInsumos as []).map((insumo, i) => {
      if (index === i) {
        console.log(typeof insumo);
        return { ...(insumo as ListadoInsumos), [event.target.name]: cantidad };
      } else {
        return insumo;
      }
    });
    const pUnitario:number[]=[]
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
      precioUnitario:precioTotal
    });
  };

  // Mandar a utils
  const insumoData = (arrIsumos: Insumo[], findInsumo: ListadoInsumos) =>
    arrIsumos.find((element) => element.id === findInsumo.insumoId);

  const arrPrecioTotal: number[] = [];

 

  return (
    <form className="AddConceptoForm" onSubmit={(event) => onSubmit(event)}>
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
          <table>
            <thead>
              <tr>
                <th>Clave</th>
                <th>Descripcion</th>
                <th>Unidad</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {formData.listadoInsumos?.map((insumo, index) => {
                const insumoPU: any = insumoData(insumos, insumo);

                // console.log("insumoPU", insumoPU);

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
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : undefined}
      </div>

      {formError && <ErrorMsg />}
      <div className="btn-group">
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit">Guardar</button>
      </div>
      <div className="tableInsumo">
        <hr />
        <div className="tableInsumoHeader">
          <h3>Listado de Insumos</h3>
          <button
            type="button"
            onClick={() => setShowConceptoTable(!showConceptoTable)}
          >
            Agregar Insumo
          </button>
        </div>
        {showConceptoTable ? (
          <TableTabsAddConcepto data={data} addInputInsumo={addInputInsumo} />
        ) : null}
      </div>
    </form>
  );
}
