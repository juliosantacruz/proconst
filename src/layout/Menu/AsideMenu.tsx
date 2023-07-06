import React from "react";
import "./AsideMenu.scss";

export default function AsideMenu() {
  return (
    <aside id="sideMenu">
      <nav>
        <ul>
        {/* Menu general */}
          <li>Inicio</li>
          <li>Listado de Conceptos</li>
          <li>Listado de Insumos</li>

          {/* Menu de presupuesto */}
          <li>Presupuesto de Obra</li>
          <li>Catalogo de Conceptos</li>
          <li>Catalogo de Insumos</li>
          <li>Analisis de Presupuesto</li>
        </ul>
      </nav>
    </aside>
  );
}
