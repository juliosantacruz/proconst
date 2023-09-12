import React from "react";
import "./SignIn.scss";
import heroImg from "../../assets/img/bgLogin3-min.jpg";
import { useNavigate } from "react-router-dom";
import { RoutesDirectory } from "../../routes/router";

export default function SignIn() {
    const navigate = useNavigate()
    const onsubmit= (event:any)=>{
        event.preventDefault()
        console.log('register')
        navigate(RoutesDirectory.HOME)
        
      }
  return (
    <section className="signinPage">
      <div
        className="heroLogin"
        style={{ backgroundImage: `url(${heroImg})` }}
      />
      <div className="resiterContainer">
        <form action="" className="signInForm form"  onSubmit={(event=>onsubmit(event))}>
        {/* <img src={logInImg} alt="" className="loginImg"/> */}
        <h2>Registrate</h2> 

          <div className="input">
            <label htmlFor="">Nombre Completo</label>
            <input type="text" />
          </div>
          <div className="input">
            <label htmlFor="">Correo Electronico</label>
            <input type="email" placeholder=" " />
          </div>
          <div className="input">
            <label htmlFor="">contraseña</label>
            <input type="password" />
          </div>
          <div className="input">
            <label htmlFor="">Confirmar contraseña</label>
            <input type="password" />
          </div>
          <button>Enviar</button>
        </form>
      </div>
    </section>
  );
}
