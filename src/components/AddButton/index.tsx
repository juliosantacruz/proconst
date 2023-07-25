import React from 'react'

import './AddButton.scss'


type AddButtonProps = {
    children:string,
    bgColor?:string,
    fontColor?:string,
    onClick:()=>void,

}

export default function AddButton({children, bgColor, fontColor, onClick}:AddButtonProps) {
  return (
    <button 
    className='addButton'
    onClick={onClick}
    style={{background:bgColor, color:fontColor}}>{children}</button>
  )
}
