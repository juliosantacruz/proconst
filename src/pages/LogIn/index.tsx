import React, { useEffect, useState } from "react";
import "./LogIn.scss";
import heroImg from "../../assets/img/bgLogin3-min.jpg";
import logInImg from "../../assets/img/logIn_image.svg";
import { Link, useNavigate } from "react-router-dom";
import { RoutesDirectory } from "../../routes/router";
import { useAuthStore } from "../../store/authStore";
import {
  CognitoUser,
  AuthenticationDetails, 
  CognitoUserSession,
} from "amazon-cognito-identity-js";
import UserPoolCognito from "../../utils/UserPool";


export default function LogIn() {
  const [loginError, setLoginError] = useState<any>();
 
  const navigate = useNavigate();
  const { isAuth, setToken, setProfile } = useAuthStore();

  useEffect(()=>{
    if(isAuth){
      navigate(RoutesDirectory.HOME);

    }
  },[])

  const onsubmit= (event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault()

    const email = (event.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
    // console.log('login',email,password)

     // Proceso de Login
     const user = new CognitoUser({
      Username: email,
      Pool: UserPoolCognito,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        // console.log("onSuccess", data);

        const userSession = data as CognitoUserSession;
        const idToken = userSession.getIdToken().getJwtToken();

        setProfile(userSession.getIdToken().payload);
        setToken(idToken);

        navigate(RoutesDirectory.HOME);
      },

      onFailure(err) {
        // console.error("error", err);
        setLoginError(err)
        navigate(RoutesDirectory.GO_VERIFY_USER(email))
        
        return;
      },
      newPasswordRequired: (data) => {
        // console.log("newPasswordRequired", data);
      },
    });
  }
  // console.log(loginError)
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
            <input type="text"  name="email" placeholder="usuario@ejemplo.com" />
          </div>
          <div className="input">
            <label htmlFor="">contraseña</label>
            <input type="password" />
          </div>
          <a href="/">Olvidaste tu contraseña..?</a>
          <button type="submit" className="successBtn" >
            Iniciar Sesion
          </button>
          <Link to={RoutesDirectory.SIGN_IN}className="registerBtn">Registrarse</Link>
        </form>
      </div>
    </section>
  );
}
