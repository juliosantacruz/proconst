import React from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../../layout/TopMenu/Navbar';

export default function CatalogoInsumos() {
  const { projectId } = useParams();

  return (
    <section className='workspace catalogoInsumosPage'>
      <Navbar>
        
      </Navbar>
        project id {projectId}
    </section>
  )
}
