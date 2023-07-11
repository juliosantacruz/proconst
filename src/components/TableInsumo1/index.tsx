import React, { SetStateAction, useRef, useState } from "react";
import type { InputRef } from "antd";
import { Button, Input, Space, Table } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { Insumo } from "../../types/Insumo";
import { useInsumoStore } from "../../store/projectStore";

type DataIndex = keyof Insumo;

import searchIcon from '../../assets/icons/bx-search.svg'
const SearchIcon = () =>{
    return(<img src={searchIcon} style={{width:'12px'}}/>)
}

export default function TableInsumo() {
  const { insumos, deleteInsumo } = useInsumoStore();

  const data: Insumo[] = insumos;

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: SetStateAction<string>
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<Insumo> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchIcon/>}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchIcon/>,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleDelete = (id:string) => {
    deleteInsumo(id)
    console.log(`se eliminar ${id}`);
  };

  const columns: ColumnsType<Insumo> = [
    {
      title: "Clave",
      dataIndex: "clave",
      key: "clave",
      width: "10%",
      ...getColumnSearchProps("clave"),
    },
    {
      title: "Descripcion",
      dataIndex: "descripcion",
      key: "descripcion",
      width: "50%",
      ...getColumnSearchProps("descripcion"),
    },
    {
      title: "Unidad",
      dataIndex: "unidad",
      key: "unidad",
      width: "10%",
      ...getColumnSearchProps("unidad"),
      sorter: (a, b) => a.unidad.length - b.unidad.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Precio",
      dataIndex: "precio",
      key: "precio",
      width: "10%",
    },
    {
      title: "Categoria",
      dataIndex: "categoria",
      key: "categoria",
      width: "10%",
      ...getColumnSearchProps("categoria"),
    },
    {
      title: "",
      key: "action",
      width: "10%",
      render: (_, record) => {
        return (<a onClick={() => handleDelete(record.id)}>Eliminar</a>)
      },
    },
  ];

  return <Table columns={columns} dataSource={data} rowKey={(record) => record.id} pagination={false}/>;
}
