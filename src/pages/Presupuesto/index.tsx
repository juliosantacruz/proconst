import React, { useEffect } from 'react'
import { usePresupuestoStore } from '../../store/projectStore'
import { useParams } from 'react-router-dom'
import PageTitle from '../../components/PageTitle'
import AddButton from '../../components/AddButton'
import { useUxStore } from '../../store/uxStore'
import AsideModal from '../../components/AsideModal'
import FormPartida from '../../components/FormPartida'

export default function Presupuesto() {
  const { openModal, setOpenModal } = useUxStore();

  const { presupuestos, addPresupuesto, deletePresupuesto} = usePresupuestoStore()
  const {projectId} = useParams()
  

  const projectData = presupuestos.find((project)=> project.id === projectId)
  console.log('normalData',projectData)

  const handleAddPartida = () => {
    console.log("Inicio");
    setOpenModal(true);
    console.log("fin");
  };
  const partidas = projectData?.partida


  return (
    <section className='workspace'>
      <PageTitle>Presupuesto de obra</PageTitle>
      <AddButton onClick={handleAddPartida} >Agregar Partida</AddButton>

      <div className="Presupuesto">
        <table>
          

        </table>
      </div>


      {openModal && (
        <AsideModal widthModal={"40vw"} title="Agregar Insumo" clossable={false}>
          <FormPartida projectId={projectData?.id}/>
        </AsideModal>
      )}
    </section>
  )
}
