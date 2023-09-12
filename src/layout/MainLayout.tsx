import AsideMenu from './AsideMenu/AsideMenu'
import Navbar from './TopMenu/Navbar'
import Footer from './Footer/Footer'
import './MainLayout.scss'
import { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { RoutesDirectory } from '../routes/router'


type Props={
  children:ReactNode,
  showLayout?:boolean
}

export default function MainLayout({children, showLayout}:Props) {
  const location = useLocation()
  console.log('location' , location.pathname)

  if(location.pathname=== RoutesDirectory.LOG_IN){
    return (
      <div id='proConst'>
          
          {/* <Navbar/> */}
          <main>
          {/* <AsideMenu/> */}
             {children}
          </main>
          {/* <Footer/> */}
         
      </div>
    )
  }else{
    return (
      <div id='proConst'>
          
          <Navbar/>
          <main>
          <AsideMenu/>
             {children}
          </main>
          <Footer/>
         
      </div>
    )
  }
  
}
