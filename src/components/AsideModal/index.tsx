import React, { useState } from 'react'
import AnyIcon from '../AnyIcon'

import './AsideModal.scss'
import closeIcon from '../../assets/icons/bx-x.svg'


export default function AsideModal({children, spreadModal, setSpreadModal, title}:any) {
    const classModal = () => {
        if(spreadModal){
            return `asideModal spread`
        }else{
            return `asideModal`
        }
    }

  return (
    <aside className={classModal()}>
        <div className="header">
            <h3>{title}</h3>
            <button className='closeIconBtn' onClick={()=>setSpreadModal(false)}>
                <AnyIcon iconSrc={closeIcon} iconWidth={30} iconHeight={30}/>
            </button>
            
        </div>
        {children}
    </aside>
  )
}
