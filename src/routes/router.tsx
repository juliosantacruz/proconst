import {lazy} from 'react'
import { useRoutes } from "react-router-dom";
import Inicio from "../pages/Inicio"; 
import NotFound from "../pages/NotFound";

const ListadoConceptos = lazy( ()=> import("../pages/ListadoConceptos"))
const ListadoInsumos = lazy( ()=> import("../pages/ListadoInsumos"))
const Presupuesto = lazy( ()=> import("../pages/Presupuesto"))

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
