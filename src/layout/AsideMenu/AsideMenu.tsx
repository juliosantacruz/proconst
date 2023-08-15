import React from "react";
import { NavLink } from "react-router-dom";
import {RoutesDirectory} from '../../routes/router'
import "./AsideMenu.scss";

export default function AsideMenu() {
   
  return (
    <aside id="sideMenu">
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
          <li>
            {/* <NavLink
              // to={RoutesDirectory.WORKING_PRESUPUESTO}
               
            > */}
              Presupuesto de Obra
            {/* </NavLink> */}
          </li>
          <li>Catalogo de Conceptos</li>
          <li>Catalogo de Insumos</li>
          <li>Analisis de Presupuesto</li>
        </ul>
      </nav>
    </aside>
  );
}
