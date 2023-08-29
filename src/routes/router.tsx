import {lazy} from 'react'
import { useRoutes } from "react-router-dom";
import Inicio from "../pages/Inicio"; 
import NotFound from "../pages/NotFound";

const ListadoConceptos = lazy( ()=> import("../pages/ListadoConceptos"))
const ListadoInsumos = lazy( ()=> import("../pages/ListadoInsumos"))
const Presupuesto = lazy( ()=> import("../pages/Presupuesto"))

export const RoutesDirectory={
  HOME :'/proconst/',
  LISTADO_CONCEPTOS:'/proconst/listado-de-conceptos',
  LISTADO_INSUMOS:'/proconst/listado-de-insumos',
  WORKING_PRESUPUESTO: '/proconst/presupuesto/:projectId',
  GO_WORKING_PRESUPUESTO:(projectId:string)=>`/proconst/presupuesto/${projectId}`
  
}

const AppRoutes = () => {
    const routes = useRoutes([
      { path: RoutesDirectory.HOME, element: <Inicio /> },
      { path: RoutesDirectory.LISTADO_CONCEPTOS, element: <ListadoConceptos /> },
      { path: RoutesDirectory.LISTADO_INSUMOS, element: <ListadoInsumos /> },
      { path: RoutesDirectory.WORKING_PRESUPUESTO, element: <Presupuesto />, errorElement:<NotFound />,  },
      { path: "/proconst/*", element: <NotFound /> },
  
    ]);
    return routes; 
  };

export default AppRoutes
