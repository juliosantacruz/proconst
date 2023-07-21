import React, { useState, useEffect } from "react";
import { Concepto, PrecioUnitario } from "../../types/Concepto";
import { v4 } from "uuid";
import "./FormConcepto.scss";
import { useInsumoStore, useConceptoStore } from "../../store/projectStore";
import type { TableProps } from "antd";
import { Table } from "antd";
import type {
  ColumnsType,
  FilterValue,
  SorterResult,
} from "antd/es/table/interface";
import { Insumo } from "../../types/Insumo";

import { setFormat } from "../../utils/CurrencyFormat";
import { Unidades } from "../../utils/SelectInputOptions";
import TableTabsAddConcepto from "../TableTabsAddConcepto";
import TableInsumoConcepto from "../TableInsumoAddConcepto";
import { useUxStore } from "../../store/uxStore";

const conceptoDefaultValue = {
  id: v4(),
  clave: "",
  descripcion: "",
  unidad: "",
  precioUnitario: [],
};

const ErrorMsg = () => {
  return (
    <p>
      Error!.. verificar datos, no dejar espacios vacios o numeros negativos
    </p>
  );
};

export default function FormConcepto() {
  const [formError, setFormError] = useState(false);
  const [showConceptoTable, setShowConceptoTable] =useState(false)
  const { setOpenModal } = useUxStore();

  const { addConcepto } = useConceptoStore();
  const { insumos } = useInsumoStore();
  const [formData, setFormData] = useState<Concepto>(conceptoDefaultValue);

  useEffect(() => {
    setFormData({
      id: v4(),
      clave: "",
      descripcion: "",
      unidad: "",
      precioUnitario: [],
    });
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
          <button
            type="button"
            onClick={() => addInputInsumo(record.id, record.precio)}
          >
            agregar
          </button>
        );
      },
    },
  ];

  //TEst

  const onSubmit = (event: any) => {
    event.preventDefault();

    if (
      formData.clave === "" ||
      formData.descripcion === "" ||
      formData.unidad === "" ||
      formData.precioUnitario?.length === 0
    ) {
      console.log(formData);
      setFormError(true);
      return console.log("error de datos");
    }

    addConcepto(formData);
    onClear();
    setFormError(false);
    setOpenModal(false);
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
  };

  const onCancel = () => {
    onClear();
    setOpenModal(false);
  };

  const addInputInsumo = (id: string, precioInsumo: number) => {
    const oldInsumo: PrecioUnitario[] | undefined = formData.precioUnitario;
    const newInsumo = {
      insumoId: id,
      cantidad: 0,
      precioInsumo: precioInsumo,
    };
    if(formData.precioUnitario?.find(pu=> pu.insumoId === newInsumo.insumoId)){
      console.log('insumo ya existe')
      return
    }else{
      setFormData({
      ...formData,
      precioUnitario: [...(oldInsumo as []), newInsumo],
    });
    }
    
  };

  const onCantidad = (event: any, index: number) => {
    const cantidad = Number(event.target.value);
    const newArr = (formData.precioUnitario as []).map((insumo, i) => {
      if (index === i) {
        console.log(typeof insumo);
        return { ...(insumo as PrecioUnitario), [event.target.name]: cantidad };
      } else {
        return insumo;
      }
    });
    setFormData({
      ...formData,
      precioUnitario: newArr,
    });
  };
  const arrPrecioTotal: number[] = [];

  (formData.precioUnitario as [])?.map((element) => {
    console.log(element);
    const total = Number(element["cantidad"]) * Number(element["precioInsumo"]);
    arrPrecioTotal.push(total);
  });
  const precioTotal = arrPrecioTotal.reduce((a, b) => a + b, 0);

  return (
    <form className="AddConceptoForm" onSubmit={(event) => onSubmit(event)}>
      <div className="inputRow">
        <div className="input">
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
        <div className="input">
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
        {/* <div className="input">
          <label htmlFor="unidad">Unidad</label>
          <input
            type="text"
            name="unidad"
            id="unidad"
            placeholder="mL"
            onChange={(event) => onChange(event)}
            value={formData.unidad}
          />
        </div> */}
        <div className="input">
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
        <div className="input">
          <label htmlFor="unidad">Precio</label>
          <p>{setFormat(precioTotal)}</p>
        </div>
      </div>
      <div className="inputInsumos">
        {(formData.precioUnitario as PrecioUnitario[]).length > 0 ? (
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
              {formData.precioUnitario?.map((insumo, index) => {
                const insumoData = insumos.filter(
                  (element) => element.id === insumo.insumoId
                );

                return (
                  <tr key={insumo.insumoId}>
                    <td className="clave">{insumoData[0].clave}</td>
                    <td className="descripcion">{insumoData[0].descripcion}</td>
                    <td className="unidad">{insumoData[0].unidad}</td>
                    <td className="cantidad">
                      <input
                        type="number"
                        name="cantidad"
                        id="cantidad"
                        onChange={(event) => onCantidad(event, index)}
                        value={insumo.cantidad}
                      />
                    </td>
                    <td className="precio">{setFormat(insumo.precioInsumo)}</td>

                    <td className="total">{setFormat(insumoData[0].precio * insumo.cantidad)}</td>
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
        <button type="button" onClick={()=>setShowConceptoTable(!showConceptoTable)}>Agregar Insumo</button>
        </div>
        {
          showConceptoTable?
        (<TableTabsAddConcepto data={data} addInputInsumo={addInputInsumo} />) : null
        }
      </div>
    </form>
  );
}
