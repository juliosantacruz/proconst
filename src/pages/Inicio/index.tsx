import React from "react";
import ProjectCard from "../../components/ProjectCard";

import "./Inicio.scss";
import PageTitle from "../../components/PageTitle";
import AddButton from "../../components/AddButton";
import { useUxStore } from "../../store/uxStore";
import { usePresupuestoStore } from '../../store/projectStore'
import AsideModal from "../../components/AsideModal";

export default function Index() {
  const { openModal, setOpenModal } = useUxStore();
  const { presupuestos, addPresupuesto, deletePresupuesto} = usePresupuestoStore()
  console.log('presupuestos',presupuestos)

  const handleAddInsumo = () => {
    console.log("Inicio");
    setOpenModal(true);
    console.log("fin");
  };
  return (
    <section className="workspace">
      <PageTitle>Mis Presupuestos</PageTitle>
      <div className="btn-header">
        <AddButton
          onClick={handleAddInsumo}
          bgColor="rgb(31, 57, 204)"
          fontColor={"rgb(255, 255, 255)"}
        >
          Agregar Proyecto
        </AddButton>
      </div>
      <div className="Presupuestos">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>

      {openModal && (
        <AsideModal widthModal={"40vw"} title="Agregar Proyecto" clossable={true}>
          <p>holis :D</p>
        </AsideModal>
      )}
    </section>
  );
}
