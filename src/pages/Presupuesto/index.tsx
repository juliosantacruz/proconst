import React, { useEffect } from 'react'
import { usePresupuestoStore } from '../../store/projectStore'
import { useParams } from 'react-router-dom'
import PageTitle from '../../components/PageTitle'

export default function Presupuesto() {
  const { presupuestos, addPresupuesto, deletePresupuesto} = usePresupuestoStore()
  const {projectId} = useParams()
  

  const projectData = presupuestos.find((project)=> project.id === projectId)
  console.log('normalData',projectData)

  useEffect(()=>{
    const projectData1 = presupuestos.find((project)=> project.id === projectId)
    console.log('useEffect',projectData1)

  },[])


  return (
    <section className='workspace'>
      <PageTitle>Presupuesto de obra</PageTitle>
    </section>
  )
}
