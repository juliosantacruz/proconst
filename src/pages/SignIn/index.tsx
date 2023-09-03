import React from 'react'

export default function SignIn() {
  return (
    <section className='signinPage'>
        
        <h2>Registrate</h2>
        <form action="" className='signInForm'>
        <div className="input">
                <label htmlFor="">Nombre Completo</label>
                <input type="text" />
            </div>
        <div className="input">
                <label htmlFor="">Correo Electronico</label>
                <input type="text" placeholder='usuario@ejemplo.com'/>
            </div>
            <div className="input">
                <label htmlFor="">Contrasenia</label>
                <input type="text" placeholder='usuario@ejemplo.com'/>
            </div>
            <div className="input">
                <label htmlFor="">Confirmar Contrasenia</label>
                <input type="text" placeholder='usuario@ejemplo.com'/>
            </div>
        </form>
    </section>
  )
}
