import { Navigate, Outlet } from "react-router-dom"
import { RoutesDirectory } from "../routes/router"

interface Props{
    isAllowed?:boolean
    children?:React.ReactNode
}

export const ProtectedRoute = ({isAllowed, children}:Props)=>{
    if(!isAllowed)return <Navigate to={RoutesDirectory.LOG_IN}/> 

    if(children){
        return <>{children}</>
    }else{
        return <Outlet/>
    }
     
}