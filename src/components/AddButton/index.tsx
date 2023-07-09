import React from 'react'

import './AddButton.scss'


type AddButtonProps = {
    children:string,
    bgColor:string,
    fontColor:string

}

export default function AddButton({children, bgColor, fontColor}:AddButtonProps) {
  return (
    <button style={{background:bgColor, color:fontColor}}>{children}</button>
  )
}
