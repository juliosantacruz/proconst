import React, { useState } from "react";
import { Partida, Presupuesto } from "../../types/Presupuesto";
import AnyIcon from "../AnyIcon";
import addIcon from "../../assets/icons/bx-plus-circle.svg";
import editIcon from "../../assets/icons/bx-edit.svg";
import deleteIcon from "../../assets/icons/bx-trash.svg"; 
import arrowDown from "../../assets/icons/bx-chevron-down.svg";
import { setFormat } from "../../utils/CurrencyFormat";
import { Insumo } from "../../types/Insumo";
import { Concepto } from "../../types/Concepto";
import { useUxStore } from "../../store/uxStore";
import { useConceptoStore, useInsumoStore, usePresupuestoStore, useWorkingPresupuesto } from "../../store/projectStore";
import { useParams } from "react-router-dom";
import { montoPartidaCant, montoProyecto, sumMontoPartida } from "../../utils/ProjectFunctions";


type Props ={
    partida:Partida
}
export default function Acordeon({partida}:Props) {
    const {
        openModalFormPartida,
        openModalFormConcepto,
        openModalFormProject,
      } = useUxStore();
      const workingProject = useWorkingPresupuesto();
      const {
        deletePartida,
        setWorkingPartida,
        addCantidadConcepto,
        deleteConceptoPartida,
        setMontoProyecto,
      } = useWorkingPresupuesto();
      const {  setPresupuestoToUpdate } =
        usePresupuestoStore();
      const { projectId } = useParams();
      const { insumos } = useInsumoStore();
      const { conceptos, deleteConcepto, setConceptoToUpdate } = useConceptoStore();
      const [sumarFSR, setSumarFSR] = useState(false);
      const [acordeon, setAcordeon] = useState(true);
    
     
    
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
      const addConcepto = () => {
        setWorkingPartida(partida);
        openModalFormConcepto(true);
      };

      const montoPartida = sumMontoPartida(partida, allConceptos);

      const montoPartidaFSR = () => {
        if (sumarFSR) {
          const monto = factorSobreCosto * (montoPartida as number);
          return monto;
        } else {
          const monto = montoPartida as number;
          return monto;
        }
      };

      const openAcordeon =()=>{
        setAcordeon(!acordeon)
      }

      const partidaIcon = ()=>{
        let classNameIcon:string

        if(acordeon){
            return classNameIcon='iconPartida Open'
        }
        if(!acordeon){
            return classNameIcon='iconPartida Close'
        }
         
      }
  
  return (
    <React.Fragment>
      <tr key={partida.id} className="partida">
        <td className="icon">
          <button className={partidaIcon()} onClick={openAcordeon}>
            <AnyIcon iconSrc={arrowDown} iconWidth={18} iconHeight={18} />
          </button>
        </td>

        <td className="clave">{partida.clave}</td>
        <td className="descripcion">{partida.nombre}</td>
        <td className="unidad"></td>
        <td className="precioUnitario"></td>
        <td className="cantidad"></td>

        <td className="total">{setFormat(montoPartidaFSR())}</td>
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
          <a onClick={() => handleEditPartida(partida)}>
            <AnyIcon
              className={"icon"}
              iconSrc={editIcon}
              iconWidth={14}
              iconHeight={14}
            />
          </a>{" "}
          |
          <a onClick={() => deletePartida(partida.id)}>
            <AnyIcon iconSrc={deleteIcon} iconWidth={14} iconHeight={14} />
          </a>
        </td>
      </tr>

      {partida.listadoConceptos
        ? partida.listadoConceptos.map((concepto) => {
            if (concepto) {
              const leConcept = findConcepto(
                concepto.conceptoId as string,
                allConceptos
              );

              const onCantidad = (event: any) => {
                let cantidadConcepto = event.target.value as number;
                if (cantidadConcepto < 0) {
                  cantidadConcepto = 0;
                }

                const montoPartida = montoPartidaCant(
                  partida,
                  allConceptos,
                  Number(cantidadConcepto),
                  concepto.conceptoId as string
                );
                console.log("montoPartida:", montoPartida);

                addCantidadConcepto(
                  concepto.conceptoId as string,
                  cantidadConcepto,
                  partida.id,
                  montoPartida
                );

                setMontoProyecto(montoProyectoFinal);
              };

              const handleDelete = (conceptoId: string, partidaId?: string) => {
                deleteConceptoPartida(conceptoId, partidaId);
                deleteConcepto(conceptoId);
              };

              const handleEdit = (element: Concepto) => {
                console.log(`se editar ${element.id}`);
                setConceptoToUpdate(element);
                openModalFormConcepto(true);
              };

              const fsrPU = () => {
                if (sumarFSR) {
                  const pu =
                    (leConcept?.precioUnitario as number) * factorSobreCosto;
                  return pu;
                } else {
                  const pu = leConcept?.precioUnitario as number;
                  return pu;
                }
              };

              const montoConcepto = (concepto.cantidad as number) * fsrPU();

              return (
                <>
                {acordeon &&
                    <tr key={concepto.conceptoId} className="concepto">
                      <td className="icon"></td>
                      <td className="clave">{leConcept?.clave}</td>
                      <td className="descripcion">{leConcept?.descripcion}</td>
                      <td className="unidad">{leConcept?.unidad}</td>
                      <td className="precioUnitario">{setFormat(fsrPU())}</td>
    
                      <td className="cantidad">
                        <input
                          type="number"
                          name="cantidad"
                          value={concepto.cantidad}
                          onChange={(event) => onCantidad(event)}
                        />
                      </td>
                      <td className="total">{setFormat(montoConcepto)}</td>
    
                      <td className="actions">
                        <a onClick={() => handleEdit(leConcept as Concepto)}>
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
                            handleDelete(
                              leConcept?.id as string,
                              partida.id as string
                            )
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
                
                }
                
                </>
              );
            } else {
              null;
            }
          })
        : null}
    </React.Fragment>
  );
}
