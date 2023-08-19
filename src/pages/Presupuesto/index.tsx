import React, { useEffect } from "react";
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
import './Presupuesto.scss'



export default function Presupuesto() {
  const {
    modalFormPartida,
    openModalFormPartida,
    modalFormConcepto,
    openModalFormConcepto,
    modalFormInsumo,
    openModalFormInsumo,
  } = useUxStore();
  const workingProject = useWorkingPresupuesto();
  const { setWorkingPresupuesto, deletePartida, setWorkingPartida, addCantidadConcepto } =
    useWorkingPresupuesto();
    const { presupuestos, updatePresupuesto } = usePresupuestoStore();
    const { projectId } = useParams();

  const { insumos } = useInsumoStore();
  const { conceptos } = useConceptoStore();
  const allConceptos = conceptos.filter((concepto)=>concepto.proyectoId===projectId)
  console.log(allConceptos)

  type FindElement = {
    id: string;
    arr: Insumo | Concepto;
  };
  const findConcepto = (id: string, arr:Concepto[]) => {
    // const array = new Array(arr);
    const element = arr.find((element) => element.id === id);
    return element;
  };
  const findInsumo = (id: string, arr:Insumo[]) => {
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
    console.log("Inicio");
    openModalFormPartida(true);
    console.log("fin");
  };

  const {
    id,
    nombreProyecto,
    fechaCreacion,
    descripcionProyecto,
    partidas,
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
        <table className="Presupuesto">
          <thead>
            <tr>
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
              partidas.sort((a: Partida, b: Partida) => a.clave.localeCompare(b.clave))
              .map((element: Partida) => {
                const addConcepto = () => {
                  setWorkingPartida(element);
                  openModalFormConcepto(true);
                };
                return (
                  <>
                    <tr key={element.id}>
                      <td>{element.clave}</td>
                      <td>{element.nombre}</td>
                      <td></td>
                      <td></td>
                      <td></td>

                      <td>{setFormat(element.montoPartida as number)}</td>
                      <td>
                        <button onClick={addConcepto}>+ Concepto </button>
                        <button onClick={() => deletePartida(element.id)}>
                          Eliminar
                        </button>
                      </td>
                    </tr>

                    {element.listadoConceptos
                      ? element.listadoConceptos.map((concepto, index) => {
                          if (concepto) {
                            const leConcept = findConcepto(
                              (concepto.conceptoId as string),
                              allConceptos
                            );
                   
                      const onCantidad = (event:any, index:number)=>{
                      
                        let cantidadConcepto = (event.target.value as number)
                          if(cantidadConcepto<0){
                            cantidadConcepto= 0
                          }
                          addCantidadConcepto((concepto.conceptoId as string),cantidadConcepto, element.id)
                    
                        }     
                        const montoConcepto = (concepto.cantidad as number) *(leConcept?.precioUnitario as number)
                        console.log(montoConcepto) 
                            return (
                              <tr key={concepto.conceptoId}>
                                 
                                <td>{leConcept?.clave}</td>
                                <td>{leConcept?.descripcion}</td>
                                <td>{leConcept?.unidad}</td>
                                <td>{setFormat(leConcept?.precioUnitario as number)}</td>

                                <td>
                                <input type="number" name="cantidad" value={concepto.cantidad} onChange={(event)=>onCantidad(event, index)}/>  
                                </td>
                                <td>{setFormat(montoConcepto)}</td>
                                 
                                <td><button>editar</button><button>Eliminar</button></td>

                              
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
