import React, { useEffect, useState } from "react";
import {
  useConceptoStore,
  useInsumoStore,
  usePresupuestoStore,
  useWorkingPresupuesto,
} from "../../store/projectStore";
import { useParams } from "react-router-dom";
import AddButton from "../../components/AddButton";
import { useUxStore } from "../../store/uxStore";
import AsideModal from "../../components/AsideModal";
import FormPartida from "../../components/FormPartida";
import { Partida, Presupuesto } from "../../types/Presupuesto";
import { setFormat } from "../../utils/CurrencyFormat";
import FormInsumo from "../../components/FormInsumo";
import FormConcepto from "../../components/FormConcepto";
import { Insumo } from "../../types/Insumo";
import { Concepto } from "../../types/Concepto";
import "./Presupuesto.scss";
import {
  montoPartidaCant,
  montoProyecto,
  sumMontoPartida,
} from "../../utils/ProjectFunctions";
import {
  createPresupuestoJSON,
  createPresupuetoCVS,
} from "../../utils/ExportFunctions";
import AnyIcon from "../../components/AnyIcon";
import addIcon from "../../assets/icons/bx-plus-circle.svg";
import editIcon from "../../assets/icons/bx-edit.svg";
import deleteIcon from "../../assets/icons/bx-trash.svg";
import saveIcon from "../../assets/icons/bx-save.svg";
import exportIcon from "../../assets/icons/bx-export.svg";

import FormPresupuesto from "../../components/FormPresupuesto";
import { useNavigate } from "react-router-dom";
import { RoutesDirectory } from "../../routes/router";
import FormTareas from "../../components/FormTareas";
import Navbar from "../../layout/TopMenu/Navbar";
import arrowDown from "../../assets/icons/bx-chevron-down.svg";
import Acordeon from "../../components/Acordeon";

export default function Presupuesto() {
  const {
    modalFormPartida,
    openModalFormPartida,
    modalFormTarea,
    openModalFormTarea,
    modalFormConcepto,
    openModalFormConcepto,
    modalFormInsumo,
    openModalFormInsumo,
    modalFormProject,
    openModalFormProject,
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
  const { presupuestos, updatePresupuesto, setPresupuestoToUpdate } =
    usePresupuestoStore();
  const { projectId } = useParams();
  const { insumos } = useInsumoStore();
  const { conceptos, deleteConcepto, setConceptoToUpdate } = useConceptoStore();
  const [sumarFSR, setSumarFSR] = useState(false);

  const navigate = useNavigate();

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

  useEffect(() => {
    const projectData = presupuestos.find(
      (project) => project.id === projectId
    );
    if (projectData === undefined) {
      console.log("proyecto no encontrado");
      navigate(RoutesDirectory.HOME);
    } else {
      setWorkingPresupuesto(projectData as Presupuesto);
    }
  }, []);

  useEffect(() => {
    updatePresupuesto(workingProject);
  }, [updatePresupuesto, workingProject]);

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
    fsc,
  } = workingProject;

  // cambiar los factores de sobre costo a porcentajes
  const { costoIndirecto, costoOperativo, financiamiento, utilidad } = fsc;
  const factorSobreCosto =
    (1 + (costoIndirecto + costoOperativo) / 100) *
    (1 + financiamiento / 100) *
    (1 + utilidad / 100);

  const findMontoProyectoFinal = () => {
    if (sumarFSR) {
      const monto = montoProyecto(partidas) * factorSobreCosto;
      return monto;
    } else {
      const monto = montoProyecto(partidas);
      return monto;
    }
  };
  const montoProyectoFinal = findMontoProyectoFinal();

  const handleEditProject = (projectUpdate: Presupuesto) => {
    setPresupuestoToUpdate(projectUpdate);
    openModalFormProject(true);
  };

  const handleEditPartida = (partida: Partida) => {
    setWorkingPartida(partida);
    openModalFormPartida(true);
  };

  const handleFSR = () => {
    setSumarFSR(!sumarFSR);
  };

  const handleGuardar = (proyecto: Presupuesto) => {
    createPresupuetoCVS(proyecto);
    console.log("se guarda", proyecto);
  };
  const handleExportarJSON = (proyecto: Presupuesto) => {
    //createJSONFile(proyecto);
    createPresupuestoJSON(workingProject, allConceptos, insumos);
    console.log("se guarda", proyecto);
  };

  return (
    <section className="workspace presupuestoPage">
      <Navbar>
        <button
          type="button"
          onClick={() => handleExportarJSON(workingProject)}
        >
          <AnyIcon iconSrc={exportIcon} />
        </button>
        <button type="button" onClick={() => handleGuardar(workingProject)}>
          <AnyIcon iconSrc={saveIcon} />
        </button>
        <AddButton onClick={() => handleEditProject(workingProject)}>
          Editar Proyecto
        </AddButton>
        <AddButton onClick={handleAddPartida}>Agregar Partida</AddButton>
        <AddButton
          onClick={handleFSR}
          className={sumarFSR ? "fsrButton fsrActive" : "fsrButton"}
        >
          Agregar FSR
        </AddButton>
      </Navbar>

      <div className="headerPresupuesto">
        <h4>{nombreProyecto}</h4>
        <h4>{setFormat(montoProyectoFinal)}</h4>
      </div>
      <p>{descripcionProyecto}</p>
      <div className="Presupuesto">
        <table className="Presupuesto">
          <thead>
            <tr className="tableHeader">
              <th></th>
              <th>Clave</th>
              <th>Descripcion</th>
              <th>Unidad</th>
              <th>PU</th>
              <th>Canidad</th>
              <th>Monto</th>
              <th>Acciones</th>
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

                  const montoPartida = sumMontoPartida(element, allConceptos);

                  console.log("montoPartida1:", montoPartida);
                  const montoPartidaFSR = () => {
                    if (sumarFSR) {
                      const monto = factorSobreCosto * (montoPartida as number);
                      return monto;
                    } else {
                      const monto = montoPartida as number;
                      return monto;
                    }
                  };

                  return (
                    
                    // <React.Fragment>
                    //   <tr key={element.id} className="partida">
                    //     <td className="icon">
                    //       <button className="iconPartida">
                    //         <AnyIcon
                    //           iconSrc={arrowDown}
                    //           iconWidth={18}
                    //           iconHeight={18}
                    //         />
                    //       </button>
                    //     </td>

                    //     <td className="clave">{element.clave}</td>
                    //     <td className="descripcion">{element.nombre}</td>
                    //     <td className="unidad"></td>
                    //     <td className="precioUnitario"></td>
                    //     <td className="cantidad"></td>

                    //     <td className="total">
                    //       {setFormat(montoPartidaFSR())}
                    //     </td>
                    //     <td className="actions">
                    //       <a onClick={addConcepto}>
                    //         <AnyIcon
                    //           className={"icon"}
                    //           iconSrc={addIcon}
                    //           iconWidth={14}
                    //           iconHeight={14}
                    //         />
                    //       </a>{" "}
                    //       |
                    //       <a onClick={() => handleEditPartida(element)}>
                    //         <AnyIcon
                    //           className={"icon"}
                    //           iconSrc={editIcon}
                    //           iconWidth={14}
                    //           iconHeight={14}
                    //         />
                    //       </a>{" "}
                    //       |
                    //       <a onClick={() => deletePartida(element.id)}>
                    //         <AnyIcon
                    //           iconSrc={deleteIcon}
                    //           iconWidth={14}
                    //           iconHeight={14}
                    //         />
                    //       </a>
                    //     </td>
                    //   </tr>

                    //   {element.listadoConceptos
                    //     ? element.listadoConceptos.map((concepto, index) => {
                    //         if (concepto) {
                    //           const leConcept = findConcepto(
                    //             concepto.conceptoId as string,
                    //             allConceptos
                    //           );

                    //           const onCantidad = (event: any) => {
                    //             let cantidadConcepto = event.target
                    //               .value as number;
                    //             if (cantidadConcepto < 0) {
                    //               cantidadConcepto = 0;
                    //             }

                    //             const montoPartida = montoPartidaCant(
                    //               element,
                    //               allConceptos,
                    //               Number(cantidadConcepto),
                    //               concepto.conceptoId as string
                    //             );
                    //             console.log("montoPartida:", montoPartida);

                    //             addCantidadConcepto(
                    //               concepto.conceptoId as string,
                    //               cantidadConcepto,
                    //               element.id,
                    //               montoPartida
                    //             );

                    //             setMontoProyecto(montoProyectoFinal);
                    //           };

                    //           const handleDelete = (
                    //             conceptoId: string,
                    //             partidaId?: string
                    //           ) => {
                    //             deleteConceptoPartida(conceptoId, partidaId);
                    //             deleteConcepto(conceptoId);
                    //           };

                    //           const handleEdit = (element: Concepto) => {
                    //             console.log(`se editar ${element.id}`);
                    //             setConceptoToUpdate(element);
                    //             openModalFormConcepto(true);
                    //           };

                    //           const fsrPU = () => {
                    //             if (sumarFSR) {
                    //               const pu =
                    //                 (leConcept?.precioUnitario as number) *
                    //                 factorSobreCosto;
                    //               return pu;
                    //             } else {
                    //               const pu =
                    //                 leConcept?.precioUnitario as number;
                    //               return pu;
                    //             }
                    //           };

                    //           const montoConcepto =
                    //             (concepto.cantidad as number) * fsrPU();

                               
                    //           return (
                    //             <tr
                    //               key={concepto.conceptoId}
                    //               className="concepto"
                    //             >
                    //               <td className="icon"></td>
                    //               <td className="clave">{leConcept?.clave}</td>
                    //               <td className="descripcion">
                    //                 {leConcept?.descripcion}
                    //               </td>
                    //               <td className="unidad">
                    //                 {leConcept?.unidad}
                    //               </td>
                    //               <td className="precioUnitario">
                    //                 {setFormat(fsrPU())}
                    //               </td>

                    //               <td className="cantidad">
                    //                 <input
                    //                   type="number"
                    //                   name="cantidad"
                    //                   value={concepto.cantidad}
                    //                   onChange={(event) => onCantidad(event)}
                    //                 />
                    //               </td>
                    //               <td className="total">
                    //                 {setFormat(montoConcepto)}
                    //               </td>

                    //               <td className="actions">
                    //                 <a
                    //                   onClick={() =>
                    //                     handleEdit(leConcept as Concepto)
                    //                   }
                    //                 >
                    //                   <AnyIcon
                    //                     className={"icon"}
                    //                     iconSrc={editIcon}
                    //                     iconWidth={14}
                    //                     iconHeight={14}
                    //                   />
                    //                 </a>{" "}
                    //                 |
                    //                 <a
                    //                   onClick={() =>
                    //                     handleDelete(
                    //                       leConcept?.id as string,
                    //                       element.id as string
                    //                     )
                    //                   }
                    //                 >
                    //                   <AnyIcon
                    //                     iconSrc={deleteIcon}
                    //                     iconWidth={14}
                    //                     iconHeight={14}
                    //                   />
                    //                 </a>
                    //               </td>
                    //             </tr>
                    //           );
                    //         } else {
                    //           null;
                    //         }
                    //       })
                    //     : null}
                    // </React.Fragment>
                    <Acordeon partida={element} />
                  );
                })}
          </tbody>
        </table>
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
      {modalFormPartida && (
        <AsideModal
          widthModal={"40vw"}
          title="Agregar Partida"
          clossable={false}
          openModal={modalFormPartida}
          setOpenModal={openModalFormPartida}
          modalType={"Partida"}
        >
          <FormPartida projectId={id} />
        </AsideModal>
      )}
      {modalFormConcepto && (
        <AsideModal
          widthModal={"75vw"}
          clossable={false}
          title="Agregar Concepto"
          openModal={modalFormConcepto}
          setOpenModal={openModalFormConcepto}
          modalType={"Concepto"}
        >
          <FormConcepto ProjectId={projectId as string} />
        </AsideModal>
      )}
      {modalFormTarea && (
        <AsideModal
          widthModal={"70vw"}
          clossable={false}
          title="Agregar Tarea"
          openModal={modalFormTarea}
          setOpenModal={openModalFormTarea}
          modalType={"Insumo"}
        >
          <FormTareas />
        </AsideModal>
      )}
      {modalFormInsumo && (
        <AsideModal
          widthModal={"50vw"}
          title="Agregar Insumo"
          clossable={false}
          openModal={modalFormInsumo}
          setOpenModal={openModalFormInsumo}
          modalType={"Insumo"}
        >
          <FormInsumo />
        </AsideModal>
      )}
    </section>
  );
}
