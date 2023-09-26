import React from 'react'
import './Footer.scss'
import logoDev from '../../assets/logo_450x200_azul_trans.png'


export default function Footer() {
  return (
    <footer>
      {/* <span>Tod</span> */}
      <a href="https://juliosantacruz.dev" target='_blank'>
        <img src={logoDev} alt="logo desarrollador" className='logoDev'/>
      </a>
    </footer>
  )
}
