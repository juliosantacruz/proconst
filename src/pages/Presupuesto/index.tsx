import React, { useEffect, useState } from "react";
import {
  useConceptoStore,
  useInsumoStore,
  usePresupuestoStore,
  useWorkingPresupuesto,
} from "../../store/projectStore";
import { useParams } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import AddButton from "../../components/AddButton";
import { useUxStore } from "../../store/uxStore";
import AsideModal from "../../components/AsideModal";
import FormPartida from "../../components/FormPartida";
import { ListadoConcepto, Partida, Presupuesto } from "../../types/Presupuesto";
import { setFormat } from "../../utils/CurrencyFormat";
import FormInsumo from "../../components/FormInsumo";
import FormConcepto from "../../components/FormConcepto";
import { Insumo } from "../../types/Insumo";
import { Concepto } from "../../types/Concepto";
import "./Presupuesto.scss";
import { montoPartidaCant, montoProyecto } from "../../utils/ProjectFunctions";
import AnyIcon from "../../components/AnyIcon";
import addIcon from '../../assets/icons/bx-plus-circle.svg'
import editIcon from "../../assets/icons/bx-edit.svg";
import deleteIcon from "../../assets/icons/bx-trash.svg";
import FormPresupuesto from "../../components/FormPresupuesto";

export default function Presupuesto() {
  const {
    modalFormPartida,
    openModalFormPartida,
    modalFormConcepto,
    openModalFormConcepto,
    modalFormInsumo,
    openModalFormInsumo,
    modalFormProject,
    openModalFormProject
  } = useUxStore();
  const workingProject = useWorkingPresupuesto();
  const {
    setWorkingPresupuesto,
    deletePartida,
    setWorkingPartida,
    addCantidadConcepto,
    deleteConceptoPartida,
    setMontoProyecto,
  } = useWorkingPresupuesto();
  const { presupuestos, updatePresupuesto, setPresupuestoToUpdate } = usePresupuestoStore();
  const { projectId } = useParams();

  const { insumos } = useInsumoStore();
  const { conceptos, deleteConcepto, setConceptoToUpdate } = useConceptoStore();
  const allConceptos = conceptos.filter(
    (concepto) => concepto.proyectoId === projectId
  );

  const findConcepto = (id: string, arr: Concepto[]) => {
    // const array = new Array(arr);
    const element = arr.find((element) => element.id === id);
    return element;
  };
  const findInsumo = (id: string, arr: Insumo[]) => {
    // const array = new Array(arr);
    const element = arr.find((element) => element.id === id);
    return element;
  };

  console.log("leWork", workingProject);

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
    openModalFormPartida(true);
  };

  const {
    id,
    nombreProyecto,
    fechaCreacion,
    descripcionProyecto,
    partidas,
    montoTotal,
  } = workingProject;
  const montoProyectoFinal = montoProyecto(partidas);
  console.log("montoFinal", montoProyectoFinal);

  const handleEditProject = (projectUpdate: Presupuesto) => {
    console.log(`se editar ${projectUpdate.id}`);
    setPresupuestoToUpdate(projectUpdate); 
    openModalFormProject(true);
  };

  const handleEditPartida = (partida:Partida) =>{
    console.log('se edita partida', partida.nombre)
    setWorkingPartida(partida)
    openModalFormPartida(true);
  }

  return (
    <section className="workspace">
      <PageTitle title="Presupuesto de obra">
        <AddButton onClick={()=>handleEditProject(workingProject)}>Editar Proyecto</AddButton>
        <AddButton onClick={handleAddPartida}>Agregar Partida</AddButton>

      </PageTitle>

      <h4>
        {nombreProyecto} - {setFormat(montoProyectoFinal)}
      </h4>
      <p>{descripcionProyecto}</p>
      <div className="Presupuesto">
        <table className="Presupuesto">
          <thead>
            <tr className="tableHeader">
              <th>Clave</th>
              <th>Descripcion</th>
              <th>Unidad</th>
              <th>PU</th>
              <th>Canidad</th>
              <th>Monto</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {partidas &&
              partidas
                .sort((a: Partida, b: Partida) =>
                  a.clave.localeCompare(b.clave)
                )
                .map((element: Partida) => {
                  const addConcepto = () => {
                    setWorkingPartida(element);
                    openModalFormConcepto(true);
                  };
                  //const montoPartida = montoPartidaF(element,allConceptos)

                  return (
                    <>
                      <tr key={element.id} className="partida">
                        <td className="clave">{element.clave}</td>
                        <td className="descripcion">{element.nombre}</td>
                        <td className="unidad"></td>
                        <td className="precioUnitario"></td>
                        <td className="cantidad"></td>

                        <td className="total">{setFormat(element.montoPartida as number)}</td>
                        <td className="actions">
                          
                        <a onClick={addConcepto}>
                              <AnyIcon
                                className={"icon"}
                                iconSrc={addIcon}
                                iconWidth={14}
                                iconHeight={14}
                              />
                            </a>{" "}
                            |
                            <a onClick={()=>handleEditPartida(element)}>
                              <AnyIcon
                                className={"icon"}
                                iconSrc={editIcon}
                                iconWidth={14}
                                iconHeight={14}
                              />
                            </a>{" "}
                            |
                            <a onClick={() => deletePartida(element.id)}>
                              <AnyIcon
                                iconSrc={deleteIcon}
                                iconWidth={14}
                                iconHeight={14}
                              />
                            </a>
                          
                        </td>
                      </tr>

                      {element.listadoConceptos
                        ? element.listadoConceptos
                        .map((concepto, index) => {
                            if (concepto) {
                              const leConcept = findConcepto(
                                concepto.conceptoId as string,
                                allConceptos
                              );

                              const onCantidad = (event: any) => {
                                let cantidadConcepto = event.target
                                  .value as number;
                                if (cantidadConcepto < 0) {
                                  cantidadConcepto = 0;
                                }

                                const montoPartida = montoPartidaCant(
                                  element,
                                  allConceptos,
                                  cantidadConcepto
                                );
                                setMontoProyecto(montoProyectoFinal);
                                addCantidadConcepto(
                                  concepto.conceptoId as string,
                                  cantidadConcepto,
                                  element.id,
                                  montoPartida
                                );
                              };
                              const handleDelete = (id: string) => {
                                deleteConcepto(id);
                                deleteConceptoPartida(id);
                              };
                              const handleEdit = (element: Concepto) => {
                                console.log(`se editar ${element.id}`);
                                setConceptoToUpdate(element);
                                openModalFormConcepto(true);
                              };
                              const montoConcepto =
                                (concepto.cantidad as number) *
                                (leConcept?.precioUnitario as number);

                              return (
                                <tr key={concepto.conceptoId} className="concepto" >
                                  <td className="clave">{leConcept?.clave}</td>
                                  <td className="descripcion">{leConcept?.descripcion}</td>
                                  <td className="unidad">{leConcept?.unidad}</td>
                                  <td className="precioUnitario">
                                    {setFormat(
                                      leConcept?.precioUnitario as number
                                    )}
                                  </td>

                                  <td className="cantidad">
                                    <input
                                      type="number"
                                      name="cantidad"
                                      value={concepto.cantidad}
                                      onChange={(event) => onCantidad(event)}
                                    />
                                  </td>
                                  <td  className="total">{setFormat(montoConcepto)}</td>

                                  <td className="actions">
                                    <a
                                      onClick={() =>
                                        handleEdit(leConcept as Concepto)
                                      }
                                    >
                                      <AnyIcon
                                        className={"icon"}
                                        iconSrc={editIcon}
                                        iconWidth={14}
                                        iconHeight={14}
                                      />
                                    </a>{" "}
                                    |
                                    <a
                                      onClick={() =>
                                        handleDelete(leConcept?.id as string)
                                      }
                                    >
                                      <AnyIcon
                                        iconSrc={deleteIcon}
                                        iconWidth={14}
                                        iconHeight={14}
                                      />
                                    </a>
                                  </td>
                                </tr>
                              );
                            } else {
                              null;
                            }
                          })
                        : null}
                    </>
                  );
                })}
          </tbody>
        </table>
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
      {modalFormPartida && (
        <AsideModal
          widthModal={"40vw"}
          title="Agregar Partida"
          clossable={false}
          openModal={modalFormPartida}
          setOpenModal={openModalFormPartida}
        >
          <FormPartida projectId={id} />
        </AsideModal>
      )}
      {modalFormConcepto && (
        <AsideModal
          widthModal={"70vw"}
          clossable={false}
          title="Agregar Concepto"
          openModal={modalFormConcepto}
          setOpenModal={openModalFormConcepto}
        >
          <FormConcepto ProjectId={projectId} />
        </AsideModal>
      )}
      {modalFormInsumo && (
        <AsideModal
          widthModal={"40vw"}
          title="Agregar Insumo"
          clossable={false}
          openModal={modalFormInsumo}
          setOpenModal={openModalFormInsumo}
        >
          <FormInsumo />
        </AsideModal>
      )}
    </section>
  );
}
