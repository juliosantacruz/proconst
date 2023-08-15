import React, { useEffect } from "react";
import { usePresupuestoStore } from "../../store/projectStore";
import { useParams } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import AddButton from "../../components/AddButton";
import { useUxStore } from "../../store/uxStore";
import AsideModal from "../../components/AsideModal";
import FormPartida from "../../components/FormPartida";
import { Partida, Presupuesto } from "../../types/Presupuesto";

export default function Presupuesto() {
  const { modalFormPartida, openModalFormPartida } = useUxStore();

  const {
    presupuestos,
    addPresupuesto,
    deletePresupuesto,
    workingPresupuesto,
    setWorkingPresupuesto,
    updatePresupuesto
  } = usePresupuestoStore();
  const { projectId } = useParams();

  useEffect(() => {
    const projectData = presupuestos.find(
      (project) => project.id === projectId
    );
    setWorkingPresupuesto(projectData as Presupuesto);
    
  }, [presupuestos]);

  // const projectData = presupuestos.find((project) => project.id === projectId);

  // console.log("workingPresupuesto", workingPresupuesto);

  const handleAddPartida = () => {
    console.log("Inicio");
    openModalFormPartida(true);
    console.log("fin");
  };
  
  // const {nombreProyecto, fechaCreacion,descripcionProyecto, partida }= workingPresupuesto
  

  return (
    <section className="workspace">
      <PageTitle>Presupuesto de obra</PageTitle>
      <AddButton onClick={handleAddPartida}>Agregar Partida</AddButton>
      {/* <h4>
        { nombreProyecto} - { fechaCreacion}
      </h4>
      <p>{ descripcionProyecto}</p> */}
      <div className="Presupuesto">
        <table>
          <thead>
            <th>Clave</th>
            <th>Nombre</th>
            <th>Actions</th>
          </thead>
          <tbody>
            {/* {partida?.sort((a:Partida,b:Partida)=> a.clave.localeCompare(b.clave)).map((element:Partida) => {
              return (
                <tr key={element.id}>
                  <td>{element.clave}</td> 
                  <td>{element.nombre}</td>
                  <td>
                    <button>+ Concepto </button>
                  </td>
                </tr>
              );
            })} */}
            
          </tbody>
        </table>
      </div>

      {modalFormPartida && (
        <AsideModal
          widthModal={"40vw"}
          title="Agregar Insumo"
          clossable={false}
          openModal={modalFormPartida}
          setOpenModal={openModalFormPartida}
        >
          <FormPartida projectId={workingPresupuesto?.id} />
        </AsideModal>
      )}
    </section>
  );
}
