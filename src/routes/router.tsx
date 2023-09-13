import {lazy} from 'react'
import { useRoutes } from "react-router-dom";
import Inicio from "../pages/Inicio"; 
import NotFound from "../pages/NotFound";
import LogIn from '../pages/LogIn';
import SignIn from '../pages/SignIn';
import ExplosionInsumos from '../pages/ExplosionInsumos';
import { ProtectedRoute } from '../libs/ProtectedRoutes';
import {useAuthStore} from '../store/authStore'

const isAuth = useAuthStore.getState().isAuth

const ListadoConceptos = lazy( ()=> import("../pages/ListadoConceptos"))
const ListadoInsumos = lazy( ()=> import("../pages/ListadoInsumos"))
const Presupuesto = lazy( ()=> import("../pages/Presupuesto"))

export const RoutesDirectory={
  LOG_IN:'/proconst/login',
  SIGN_IN:'/proconst/registro',
  HOME :'/proconst/',
  LISTADO_CONCEPTOS:'/proconst/listado-de-conceptos',
  LISTADO_INSUMOS:'/proconst/listado-de-insumos',
  WORKING_PRESUPUESTO: '/proconst/presupuesto/:projectId',
  GO_WORKING_PRESUPUESTO:(projectId:string)=>`/proconst/presupuesto/${projectId}`,
  EXPLOSION_INSUMOS: '/proconst/analisis/:projectId',
  GO_EXPLOSION_INSUMOS:(projectId:string)=>`/proconst/analisis/${projectId}`,

}

const AppRoutes = () => {
    const routes = useRoutes([
      { path: RoutesDirectory.LOG_IN, element: <LogIn /> },
      { path: RoutesDirectory.SIGN_IN, element: <SignIn /> },
      { element: <ProtectedRoute isAllowed={isAuth} />, children:[
        { path: RoutesDirectory.HOME, element: <Inicio /> },
        { path: RoutesDirectory.LISTADO_CONCEPTOS, element: <ListadoConceptos /> },
        { path: RoutesDirectory.LISTADO_INSUMOS, element: <ListadoInsumos /> },
        { path: RoutesDirectory.WORKING_PRESUPUESTO, element: <Presupuesto />, errorElement:<NotFound />,  },
        { path: RoutesDirectory.EXPLOSION_INSUMOS, element: <ExplosionInsumos />, errorElement:<NotFound />,  },

      ] },


      
      { path: "/proconst/*", element: <NotFound /> },
  
    ]);
    return routes; 
  };

export default AppRoutes
