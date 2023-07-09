import React from "react";
import { NavLink } from "react-router-dom";
import "./AsideMenu.scss";

export default function AsideMenu() {
   
  return (
    <aside id="sideMenu">
      <nav>
        <ul>
          {/* Menu general */}
          <li>
            <NavLink
              to="/"
              
            >
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/listado-de-conceptos"
               
            >
              Listado de Conceptos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/listado-de-insumos"
               
            >
              Listado de Insumos
            </NavLink>
          </li>

          {/* Menu de presupuesto */}
          <li>
            <NavLink
              to="/presupuesto"
               
            >
              Presupuesto de Obra
            </NavLink>
          </li>
          <li>Catalogo de Conceptos</li>
          <li>Catalogo de Insumos</li>
          <li>Analisis de Presupuesto</li>
        </ul>
      </nav>
    </aside>
  );
}
