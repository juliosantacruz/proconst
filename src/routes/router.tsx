import React from 'react'
import { useRoutes } from "react-router-dom";

import Inicio from "../pages/Inicio";
import ListadoConceptos from "../pages/ListadoConceptos";
import ListadoInsumos from "../pages/ListadoInsumos";
import Presupuesto from "../pages/Presupuesto";
import NotFound from "../pages/NotFound";


const AppRoutes = () => {
    const routes = useRoutes([
      { path: "/", element: <Inicio /> },
      { path: "/listado-de-conceptos", element: <ListadoConceptos /> },
      { path: "/listado-de-insumos", element: <ListadoInsumos /> },
      { path: "/presupuesto/:projectId", element: <Presupuesto />},
      { path: "/*", element: <NotFound /> },
  
    ]);
    return routes;
  };

export default AppRoutes
