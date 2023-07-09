import React from 'react'
import PageTitle from '../../components/PageTitle'
import './ListadoInsumos.scss'
import AddButton from '../../components/AddButton'

export default function ListadoInsumos() {
  return (
    <section className='workspace'>
      <PageTitle>
        Mis Insumos
      </PageTitle>  
      <AddButton bgColor='rgb(31, 57, 204)' fontColor={'rgb(255, 255, 255)'} >Agregar Insumo</AddButton>
      <div className='insumosGroup'>

      </div>
    </section>
  )
}
