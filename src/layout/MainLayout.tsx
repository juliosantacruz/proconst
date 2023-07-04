import React from 'react'
import AsideMenu from './Menu/AsideMenu'
import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'
import './MainLayout.scss'

export default function MainLayout({children}:any) {
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
