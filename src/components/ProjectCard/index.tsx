import React from "react";
import { usePresupuestoStore } from '../../store/projectStore'

import "./ProjectCard.scss";
import { setFormat } from "../../utils/CurrencyFormat";
import { NavLink } from "react-router-dom";
import { Presupuesto } from "../../types/Presupuesto";


export default function ProjectCard({projectId}:any) {
  const { presupuestos, addPresupuesto, deletePresupuesto, setWorkingPresupuesto} = usePresupuestoStore()

  const projectData = presupuestos.find((project)=> project.id === projectId)
  // console.log('card',projectData)

  const handleDelete =(id:any)=>{
    deletePresupuesto(id)
  }

  return (
    <article>
      <div className="header">
        <h4 className="titleCard">{projectData?.nombreProyecto}</h4>
      </div>
      <div className="content">
        <p className="descriptionCard">
          {projectData?.descripcionProyecto}
        </p>
        <p className="dateCard">{projectData?.fechaCreacion.slice(0,10)}</p>
      </div>

      <div className="footer">
        <p className="amountCard"><b>{setFormat((projectData?.montoTotal as number))}</b></p>
        <button type="button" onClick={()=>handleDelete(projectData?.id)}>Eliminar</button>
        <NavLink to={`/presupuesto/${(projectData?.id)}`} >Abrir</NavLink>
      </div>
    </article>
  );
}
