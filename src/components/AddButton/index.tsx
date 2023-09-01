import React, { ReactNode } from 'react'

import './AddButton.scss'


type AddButtonProps = {
    className?:string,
    children:string|ReactNode,
    bgColor?:string,
    fontColor?:string,
    onClick:()=>void,

}

export default function AddButton({children, bgColor, fontColor, className,onClick}:AddButtonProps) {
  return (
    <button 
    type='button'
    className={`addButton ${className}`}
    onClick={onClick}
    style={{background:bgColor, color:fontColor}}>{children}</button>
  )
}
