import React from 'react'

import './AddButton.scss'


type AddButtonProps = {
    className?:string,
    children:string,
    bgColor?:string,
    fontColor?:string,
    onClick:()=>void,

}

export default function AddButton({children, bgColor, fontColor, className,onClick}:AddButtonProps) {
  return (
    <button 
    className={`addButton ${className}`}
    onClick={onClick}
    style={{background:bgColor, color:fontColor}}>{children}</button>
  )
}
