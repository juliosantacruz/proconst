import React from 'react'
import { useParams } from 'react-router-dom';

export default function CatalogoInsumos() {
  const { projectId } = useParams();

  return (
    <section className='workspaceCatalogoInsumos'>
        project id {projectId}
    </section>
  )
}
