import React from 'react'
import './Banner.scss'
import bannerImage from '../../assets/img/banner-img.png'

export default function Banner() {

    const bannerImgBg = { backgroundImage:`url(${bannerImage})` }

  return (
    <div className='bannerObj'style={bannerImgBg}>
         
            <div className="bannerContent">
                <h3>
                Ya esta casi esta lista la version 4.0
su lanzamiento  <br/> sera en 7 dias, estos son los cambios
                </h3>
                <button>Ver Mas...</button>
           
        </div>
    </div>
  )
}
