import React from "react";
import { NavLink } from "react-router-dom";
import {RoutesDirectory} from '../../routes/router'
import "./AsideMenu.scss";
import {useWorkingPresupuesto} from '../../store/projectStore'

export default function AsideMenu() {
   const {id, nombreProyecto}= useWorkingPresupuesto()
   console.log(id)

  return (
    <aside id="sideMenu" className="sideMenu">
      <nav>
        <ul>
        
          {/* Menu general */}
          <li>
            <NavLink
              to={RoutesDirectory.HOME}
              
            >
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink
              to={RoutesDirectory.LISTADO_CONCEPTOS}
               
            >
              Listado de Conceptos
            </NavLink>
          </li>
          <li>
            <NavLink
              to={RoutesDirectory.LISTADO_INSUMOS}
               
            >
              Listado de Insumos
            </NavLink>
          </li>
          <hr/>
          {/* Menu de presupuesto */}

          {id ?  
          <>
          <p>Trabajando en <br/> <span>{nombreProyecto}</span></p>
          <li>
            <NavLink
              to={RoutesDirectory.GO_WORKING_PRESUPUESTO(id)}
               
            >
              Presupuesto de Obra
            </NavLink>
          </li>
          <li>
            <NavLink
              to={RoutesDirectory.GO_EXPLOSION_INSUMOS(id)}
               
            >
              Explosion de insumos
            </NavLink>
          </li>
          <li>Catalogo de Conceptos</li>
          <li>Catalogo de Insumos</li>
          <li>Analisis de Presupuesto</li>
          
          </>
          :null}
          
        </ul>
      </nav>
    </aside>
  );
}
