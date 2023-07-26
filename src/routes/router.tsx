import React from 'react'
import { useRoutes } from "react-router-dom";

import Inicio from "../pages/Inicio";
import ListadoConceptos from "../pages/ListadoConceptos";
import ListadoInsumos from "../pages/ListadoInsumos";
import Presupuesto from "../pages/Presupuesto";
import NotFound from "../pages/NotFound";


const AppRoutes = () => {
    const routes = useRoutes([
      { path: "proconst/", element: <Inicio /> },
      { path: "proconst/listado-de-conceptos", element: <ListadoConceptos /> },
      { path: "proconst/listado-de-insumos", element: <ListadoInsumos /> },
      { path: "proconst/presupuesto/:projectId", element: <Presupuesto />},
      { path: "proconst/*", element: <NotFound /> },
  
    ]);
    return routes;
  };

export default AppRoutes
