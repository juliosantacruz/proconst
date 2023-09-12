import React from "react";
import "./LogIn.scss";
import heroImg from "../../assets/img/bgLogin3-min.jpg";
import logInImg from "../../assets/img/logIn_image.svg";


export default function LogIn() {

  const onsubmit= (event:any)=>{
    event.preventDefault()
    console.log('login')
  }

  return (
    <section className="loginPage">
      <div
        className="heroLogin"
        style={{ backgroundImage: `url(${heroImg})` }}
      />
      <div className="loginContainer">
        <form action="" className="loginForm form" onSubmit={(event=>onsubmit(event))}>
        <img src={logInImg} alt="" className="loginImg"/>
          <h2>Iniciar sesión</h2>
          <div className="input">
            <label htmlFor="">Correo Electronico</label>
            <input type="text" placeholder="usuario@ejemplo.com" />
          </div>
          <div className="input">
            <label htmlFor="">Contrasenia</label>
            <input type="password" />
          </div>
          <a href="/">Olvidaste tu contrasenia..?</a>
          <button type="submit" className="successBtn" >
            Iniciar Sesion
          </button>
          <a href=""className="registerBtn">Registrarse</a>
        </form>
      </div>
    </section>
  );
}
