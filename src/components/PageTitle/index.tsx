import React from 'react'

import './PageTItle.scss'

type PageTitleProps={
    children:string
}

export default function PageTitle({children}:PageTitleProps) {
  return (
    <div className='pageTitle'>
        <h2>{children}</h2>
    </div>
  )
}
