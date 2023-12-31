import React from "react";
import ProjectCard from "../../components/ProjectCard";

import "./Inicio.scss";
import PageTitle from "../../components/PageTitle";
import AddButton from "../../components/AddButton";
import { useUxStore } from "../../store/uxStore";
import { usePresupuestoStore } from "../../store/projectStore";
import AsideModal from "../../components/AsideModal";
import FormPresupuesto from "../../components/FormPresupuesto";
import uploadIcon from "../../assets/icons/bx-upload.svg";
import AnyIcon from "../../components/AnyIcon";
import FormLoad from "../../components/FormLoad";
import { Outlet } from "react-router-dom";
import Navbar from "../../layout/TopMenu/Navbar";
import Banner from "../../components/Banner";

export default function Index() {
  const {
    modalFormProject,
    openModalFormProject,
    modalFormLoad,
    openModalFormLoad,
  } = useUxStore();
  const { presupuestos, addPresupuesto, deletePresupuesto } =
    usePresupuestoStore();
  console.log("presupuestos", presupuestos);

  const handleAddProject = () => {
    console.log("Inicio");
    openModalFormProject(true);
    console.log("fin");
  };

  const handleImportProject = () => {
    openModalFormLoad(!modalFormLoad);
    console.log("cargar :D");
  };

  return (
    <section className="workspace inicioPage">
      <Navbar>
        <AddButton
          onClick={handleImportProject}
          bgColor="rgb(226, 230, 255)"
          fontColor={"rgb(0, 0, 0)"}
        >
          <AnyIcon iconSrc={uploadIcon} /> Proyecto
        </AddButton>

        <AddButton
          onClick={handleAddProject}
          bgColor="rgb(31, 57, 204)"
          fontColor={"rgb(255, 255, 255)"}
        >
          + Proyecto
        </AddButton>
      </Navbar>

      <Banner />
      <div className="Presupuestos">
        <h2>Mis Presupuestos</h2>
        <div className="PresupuestosGroup">
          {presupuestos.map((presupuesto) => {
            return (
              <ProjectCard key={presupuesto.id} projectId={presupuesto.id} />
            );
          })}
        </div>
      </div>
      {modalFormProject && (
        <AsideModal
          widthModal={"50vw"}
          title="Agregar Proyecto"
          clossable={true}
          openModal={modalFormProject}
          setOpenModal={openModalFormProject}
          modalType={"Presupuesto"}
        >
          <FormPresupuesto />
        </AsideModal>
      )}

      {modalFormLoad && (
        <AsideModal
          widthModal={"40vw"}
          title=" "
          clossable={true}
          openModal={modalFormLoad}
          setOpenModal={openModalFormLoad}
          modalType={"Load"}
        >
          <FormLoad typeForm="presupuesto" />
        </AsideModal>
      )}
    </section>
  );
}
