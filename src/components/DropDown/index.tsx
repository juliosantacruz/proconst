import React, { useState } from 'react'
import './DropDown.scss'
import icon from '../../assets/icons/bxs-download.svg'


export default function DropDown() {
  const [open, setOpen]=useState(false)

  
  return (
    <div className='menuContainer '>
      <div className="menuTrigger" onClick={()=>setOpen(!open)}>
          <div className='userIcon'>JS</div>
      </div>

      <div className={`dropdown-menu ${open? 'active':'inactive'}`}>
        <h3>title <br /> <span>SubTitle?</span></h3>
        <ul>
          <LogOut/>
          <DropDownItem/>
          <DropDownItem/>

        </ul>
      </div>
    </div>
  )
}

import { useAuthStore } from '../../store/authStore'
import { useNavigate } from 'react-router-dom'
import { RoutesDirectory } from '../../routes/router'
function LogOut(){
  const navigate= useNavigate()
  const {setLogout}=useAuthStore()

  const LogOut=()=>{
    setLogout()
    navigate(RoutesDirectory.LOG_IN)
  }

  return(<li className='dropdownItem noBtn'>
    <img src={icon} alt="icon" />
    <button type='button' onClick={LogOut}>Cerrar Session</button>
  </li>)
}

function DropDownItem(){

  return(<li className='dropdownItem'>
    <img src={icon} alt="icon" />
    <a href="">link</a>
  </li>)
}