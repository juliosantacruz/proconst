import AsideMenu from './AsideMenu/AsideMenu'
import Navbar from './TopMenu/Navbar'
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
