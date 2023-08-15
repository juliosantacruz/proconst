import React, { ReactNode } from 'react'

import './PageTItle.scss'

type PageTitleProps={
  title:string, 
  children: ReactNode
}

export default function PageTitle({title, children}:PageTitleProps) {
  return (
    <div className='pageTitle'>
        <h2>{title}</h2>
        <div className='buttonTitle'>{children}</div>
    </div>
  )
}
