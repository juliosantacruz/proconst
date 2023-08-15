import React, { useEffect } from "react";
import {
  usePresupuestoStore,
  useWorkingPresupuesto,
} from "../../store/projectStore";
import { useParams } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import AddButton from "../../components/AddButton";
import { useUxStore } from "../../store/uxStore";
import AsideModal from "../../components/AsideModal";
import FormPartida from "../../components/FormPartida";
import { Partida, Presupuesto } from "../../types/Presupuesto";
import { setFormat } from "../../utils/CurrencyFormat";

export default function Presupuesto() {
  const { modalFormPartida, openModalFormPartida } = useUxStore();
  const workingProject = useWorkingPresupuesto();
  const { setWorkingPresupuesto, deletePartida } = useWorkingPresupuesto();
  console.log("leWork", workingProject);

  const { presupuestos, updatePresupuesto } = usePresupuestoStore();

  const { projectId } = useParams();

  useEffect(() => {
    const projectData = presupuestos.find(
      (project) => project.id === projectId
    );

    setWorkingPresupuesto(projectData as Presupuesto);
  }, []);

  useEffect(() => {
    updatePresupuesto(workingProject);
  }, [workingProject]);

  const handleAddPartida = () => {
    console.log("Inicio");
    openModalFormPartida(true);
    console.log("fin");
  };

  const {
    id,
    nombreProyecto,
    fechaCreacion,
    descripcionProyecto,
    partida,
    montoTotal,
  } = workingProject;

  return (
    <section className="workspace">
      <PageTitle title="Presupuesto de obra">
        <AddButton onClick={handleAddPartida}>Agregar Partida</AddButton>
      </PageTitle>

      <h4>
        {nombreProyecto} - {setFormat(montoTotal)}
      </h4>
      <p>{descripcionProyecto}</p>
      <div className="Presupuesto">
        <table>
          <thead>
            <tr>
              <th>Clave</th>
              <th>Nombre</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {partida
              ?.sort((a: Partida, b: Partida) => a.clave.localeCompare(b.clave))
              .map((element: Partida) => {
                return (
                  <tr key={element.id}>
                    <td>{element.clave}</td>
                    <td>{element.nombre}</td>
                    <td>
                      <button>+ Concepto </button>
                      <button onClick={() => deletePartida(element.id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
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
          <FormPartida projectId={id} />
        </AsideModal>
      )}
    </section>
  );
}
