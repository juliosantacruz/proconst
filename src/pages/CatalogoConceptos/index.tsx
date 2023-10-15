import React from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../../layout/TopMenu/Navbar';

function CatalogoConceptos() {
  const { projectId } = useParams();

  return (
    <section className='workspace catalogoConceptosPage'>
      <Navbar>
        
      </Navbar>
    project id {projectId}
</section>
  )
}

export default CatalogoConceptos