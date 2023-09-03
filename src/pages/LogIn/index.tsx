import React from "react";
import "./LogIn.scss";

export default function LogIn() {
  return (
    <section className="loginPage">
      <h2>Inicia Sesion</h2>
      <form action="" className="loginForm">
        <div className="input">
          <label htmlFor="">Correo Electronico</label>
          <input type="text" placeholder="usuario@ejemplo.com" />
        </div>
        <div className="input">
          <label htmlFor="">Contrasenia</label>
          <input type="password" />
        </div>
        <a href="/">Olvidaste tu contrasenia..?</a>
        <button>Iniciar Sesion</button>
      </form>
      <a href="">Registrarse</a>
    </section>
  );
}
