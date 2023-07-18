import React, { useState } from "react";

import { Tabs } from "antd";
import PageTitle from "../../components/PageTitle";
import AddButton from "../../components/AddButton";
import { useInsumoStore } from "../../store/projectStore";
import { useUxStore } from "../../store/uxStore";
import FormInsumo from "../../components/FormInsumo";
import TableInsumo from "../../components/TableInsumo1";
import { Insumo } from "../../types/Insumo";
import AsideModal from "../../components/AsideModal";
import "./ListadoInsumos.scss";

export default function ListadoInsumos() {
  const {openModal, setOpenModal} = useUxStore()
  const { insumos } = useInsumoStore();

  const insumoFilter = (arr: Insumo[], categoria: string) => {
    return arr.filter((element) => element.categoria === categoria);
  };
  const TodosInsumos = insumos;

  const MaterialInsumos = insumoFilter(insumos, "Materiales");
  const ManoObraInsumos = insumoFilter(insumos, "Mano de Obra");
  const HerramientaInsumos = insumoFilter(insumos, "Herramienta");
  const EquipoInsumos = insumoFilter(insumos, "Equipo");
  const SubContratoInsumos = insumoFilter(insumos, "Subcontrato");

  const handleAddInsumo = () => {
    console.log("Inicio");
    setOpenModal(true);
    console.log("fin");
  };

  const onChange = (key: string) => {
    console.log(key);
  };

  const InsumosTabs = [
    {
      label: `Todos`,
      key: "1",
      children: <TableInsumo insumosData={TodosInsumos}  />,
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
      children: <TableInsumo insumosData={HerramientaInsumos}  />,
    },
    {
      label: `Equipos`,
      key: "5",
      children: <TableInsumo insumosData={EquipoInsumos} />,
    },
    {
      label: `SubContratos`,
      key: "6",
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
      </div>
      {openModal && (
        <AsideModal
          widthModal={"40vw"}
          title="Agregar Insumo"
        >
          <FormInsumo />
        </AsideModal>
      )}
    </section>
  );
}
