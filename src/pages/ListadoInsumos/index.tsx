import React from "react";
import { v4 } from "uuid";
import { Tabs } from "antd";

import PageTitle from "../../components/PageTitle";
import "./ListadoInsumos.scss";
import AddButton from "../../components/AddButton";
import { useInsumoStore } from "../../store/projectStore";
import InsumoForm from "../../components/InsumoForm";
import TableInsumo from "../../components/TableInsumo1";
import TabSections from "../../components/Tabs";
import { Insumo } from "../../types/Insumo";

export default function ListadoInsumos() {
  const { insumos, addInsumo } = useInsumoStore();
  console.log(insumos);

  const insumoFilter = (arr: Insumo[], categoria: string) => {
    return arr.filter((element) => element.categoria === categoria);
  };
  const TodosInsumos = insumos;

  const MaterialInsumos = insumoFilter(insumos, 'material')
  const ManoObraInsumos = insumoFilter(insumos, 'Mano de Obra')
  const HerramientaInsumos = insumoFilter(insumos, 'Herramienta')
  const EquipoInsumos = insumoFilter(insumos, 'Equipo')
  const SubContratoInsumos = insumoFilter(insumos, 'Subcontrato')



  const test = {
    id: v4(),
    clave: "001",
    descripcion: "test",
    unidad: "kg",
    precio: 23,
    categoria: "material",
  };
  const handleAddInsumo = () => {
    console.log("Inicio");
    addInsumo(test);
    console.log("fin");
  };

  const onChange = (key: string) => {
    console.log(key);
  };

  const InsumosTabs = [
    {
      label: `Todos`,
      key: "1",
      children: <TableInsumo insumosData={TodosInsumos} />,
    },
    {
      label: `Materiales`,
      key: "2",
      children: <TableInsumo insumosData={MaterialInsumos} />,
    },
    {
      label: `Mano de Obra`,
      key: "3",
      children: <TableInsumo insumosData={ManoObraInsumos} />,
    },
    {
      label: `Herramienta`,
      key: "4",
      children: <TableInsumo insumosData={HerramientaInsumos} />,
    },
    {
      label: `Equipos`,
      key: "5",
      children: <TableInsumo insumosData={EquipoInsumos} />,
    },
    {
      label: `SubContratos`,
      key: "5",
      children: <TableInsumo insumosData={SubContratoInsumos} />,
    },
  ];
  return (
    <section className="workspace">
      <PageTitle>Mis Insumos</PageTitle>
      <div className="btn-header">
        <AddButton
          onClick={handleAddInsumo}
          bgColor="rgb(31, 57, 204)"
          fontColor={"rgb(255, 255, 255)"}
        >
          Agregar Insumo
        </AddButton>
      </div>

      <div className="insumosGroup">
        {/* {insumos.map((element)=>{
          return(<li key={element.id}>{element.descripcion}</li>)
        })} */}

        <Tabs onChange={onChange} type="card" items={InsumosTabs} />

        <InsumoForm />
      </div>
    </section>
  );
}
