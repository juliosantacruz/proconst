import { Table } from 'antd'
import { ColumnsType, TableProps } from 'antd/es/table';
import React, { useState } from 'react'
import { Insumo } from '../../types/Insumo';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { setFormat } from '../../utils/CurrencyFormat';
import { PrecioUnitario } from '../../types/Concepto';

export default function TableInsumoAddConcepto({insumosData, addInputInsumo}:any) {
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
//   const addInputInsumo = (id: string, precioInsumo: number) => {
//     const oldInsumo: PrecioUnitario[] | undefined = formData.precioUnitario;
//     const newInsumo = {
//       insumoId: id,
//       cantidad: 0,
//       precioInsumo: precioInsumo,
//     };
//     setFormData({
//       ...formData,
//       precioUnitario: [...(oldInsumo as []), newInsumo],
//     });
//   };

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
  return (
    <Table
    className={'tableAddConcepto'}
    scroll={{ y: 200 }}
    size='small'
          columns={columns}
          dataSource={insumosData}
          onChange={handleChange}
          rowKey={(record) => record.id}
          pagination={false}
        /> 
  )
}
