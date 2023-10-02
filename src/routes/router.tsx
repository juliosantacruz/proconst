import {lazy} from 'react'
import { useRoutes } from "react-router-dom";
import Inicio from "../pages/Inicio"; 
import NotFound from "../pages/NotFound";
import LogIn from '../pages/LogIn';
import ExplosionInsumos from '../pages/ExplosionInsumos';
import { ProtectedRoute } from '../libs/ProtectedRoutes';
import {useAuthStore} from '../store/authStore'
import Register from '../pages/Register';
import VerifyUser from '../pages/VerifyUser';
import ListadoProyectos from '../pages/ListadoProyectos';
import CatalogoInsumos from '../pages/CatalogoInsumos';
import CatalogoConceptos from '../pages/CatalogoConceptos';

const isAuth = useAuthStore.getState().isAuth

const ListadoConceptos = lazy( ()=> import("../pages/ListadoConceptos"))
const ListadoInsumos = lazy( ()=> import("../pages/ListadoInsumos"))
const Presupuesto = lazy( ()=> import("../pages/Presupuesto"))

export const RoutesDirectory={
  LOG_IN:'/login',
  SIGN_IN:'/registro',
  VERIFY_USER:'/verify/:email',
  GO_VERIFY_USER:(email:string)=>`/verify/${email}`,
  HOME :'/',
  LISTADO_CONCEPTOS:'/listado-de-conceptos',
  LISTADO_INSUMOS:'/listado-de-insumos',
  ALL_PRESUPUESTOS: '/presupuesto',
  WORKING_PRESUPUESTO: ':projectId',
  GO_WORKING_PRESUPUESTO:(projectId:string)=>`/presupuesto/${projectId}`,
  EXPLOSION_INSUMOS: '/analisis/:projectId',
  GO_EXPLOSION_INSUMOS:(projectId:string)=>`/analisis/${projectId}`,
  CATALOGO_INSUMOS: '/catalogoInsumos/:projectId',
  GO_CATALOGO_INSUMOS:(projectId:string)=>`/catalogoInsumos/${projectId}`, 
  CATALOGO_CONCEPTOS: '/catalogoConceptos/:projectId',
  GO_CATALOGO_CONCEPTOS:(projectId:string)=>`/catalogoConceptos/${projectId}`,

}

const AppRoutes = () => {
    const routes = useRoutes([
      { path: RoutesDirectory.LOG_IN, element: <LogIn /> },
      { path: RoutesDirectory.SIGN_IN, element: <Register /> },
      { path: RoutesDirectory.VERIFY_USER, element: <VerifyUser /> },
      { element: <ProtectedRoute isAllowed={isAuth} />, children:[
        { path: RoutesDirectory.HOME, element: <Inicio /> },
        { path: RoutesDirectory.LISTADO_CONCEPTOS, element: <ListadoConceptos /> },
        { path: RoutesDirectory.LISTADO_INSUMOS, element: <ListadoInsumos /> },
        { path: RoutesDirectory.ALL_PRESUPUESTOS, element: <ListadoProyectos />, children:[
          { path: RoutesDirectory.WORKING_PRESUPUESTO, element: <Presupuesto /> },
        ]},
        { path: RoutesDirectory.EXPLOSION_INSUMOS, element: <ExplosionInsumos />, errorElement:<NotFound />,  },
        { path: RoutesDirectory.CATALOGO_INSUMOS, element: <CatalogoInsumos />, errorElement:<NotFound />,  },
        { path: RoutesDirectory.CATALOGO_CONCEPTOS, element: <CatalogoConceptos />, errorElement:<NotFound />,  },
        
      ] },


      
      { path: "/*", element: <NotFound /> },
  
    ]);
    return routes; 
  };

export default AppRoutes
