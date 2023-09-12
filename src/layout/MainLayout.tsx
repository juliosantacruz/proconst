import AsideMenu from './AsideMenu/AsideMenu'
import Navbar from './TopMenu/Navbar'
import Footer from './Footer/Footer'
import './MainLayout.scss'
import { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { RoutesDirectory } from '../routes/router'


type Props={
  children:ReactNode
}

export default function MainLayout({children}:Props) {
  const location = useLocation()
  console.log('location' , location.pathname)

  if(location.pathname=== RoutesDirectory.LOG_IN ||location.pathname=== RoutesDirectory.SIGN_IN ){
    return (
      <main id='proConst'>
          
          {/* <Navbar/> */}
          
          {/* <AsideMenu/> */}
             {children}
          
          {/* <Footer/> */}
         
      </main>
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
