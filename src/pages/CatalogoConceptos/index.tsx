import React from 'react'
import { useParams } from 'react-router-dom';

function CatalogoConceptos() {
  const { projectId } = useParams();

  return (
    <section className='workspaceCatalogoConceptos'>
    project id {projectId}
</section>
  )
}

export default CatalogoConceptos