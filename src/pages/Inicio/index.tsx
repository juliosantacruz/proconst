import React from "react";
import ProjectCard from "../../components/ProjectCard";

import "./Inicio.scss";
import PageTitle from "../../components/PageTitle";
import AddButton from "../../components/AddButton";
import { useUxStore } from "../../store/uxStore";
import { usePresupuestoStore } from "../../store/projectStore";
import AsideModal from "../../components/AsideModal";
import FormPresupuesto from "../../components/FormPresupuesto";

export default function Index() {
  const { modalFormProject, openModalFormProject } = useUxStore();
  const { presupuestos, addPresupuesto, deletePresupuesto } =
    usePresupuestoStore();
  console.log("presupuestos", presupuestos);

  const handleAddInsumo = () => {
    console.log("Inicio");
    openModalFormProject(true);
    console.log("fin");
  };
  return (
    <section className="workspace">
      <PageTitle title="Mis Presupuestos">
        <AddButton
          onClick={handleAddInsumo}
          bgColor="rgb(31, 57, 204)"
          fontColor={"rgb(255, 255, 255)"}
        >
          Agregar Proyecto
        </AddButton>
      </PageTitle>
      <div className="btn-header"></div>
      <div className="Presupuestos">
        {presupuestos.map((presupuesto) => {
          return (
            <ProjectCard key={presupuesto.id} projectId={presupuesto.id} />
          );
        })}
      </div>

      {modalFormProject && (
        <AsideModal
          widthModal={"40vw"}
          title="Agregar Proyecto"
          clossable={true}
          openModal={modalFormProject}
          setOpenModal={openModalFormProject}
        >
          <FormPresupuesto />
        </AsideModal>
      )}
    </section>
  );
}
