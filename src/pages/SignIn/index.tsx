import React, { useState } from "react";
import "./SignIn.scss";
import heroImg from "../../assets/img/bgLogin3-min.jpg";
import { useNavigate } from "react-router-dom";
import { RoutesDirectory } from "../../routes/router";
import UserPoolCognito, { verifyUser } from "../../utils/UserPool";
import logInImg from '../../assets/img/register_image.svg'


const formDataDefaultValur = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignIn() {
  const [fase1, setFase1] = useState(true);
  const [verifyCode, setVerifyCode] = useState("");

  const [formData, setFormData] = useState(formDataDefaultValur);
  const [loginData, setLoginData] = useState<any>();
  const [loginError, setLoginError] = useState<any>();
  const navigate = useNavigate();

  const onSubmit = (event: any) => {
    event.preventDefault();
    console.log("register");
    if (formData.password === formData.confirmPassword) {
      UserPoolCognito.signUp(
        formData.email,
        formData.password,
        [{ Name: "name", Value: formData.name } as any],
        [],
        (err, data) => {
          if (err) {
            setLoginError(err);
            console.log(err);
          }
          setLoginData(data);
        }
      );
      console.log("error", loginError);
      console.log("data", loginData);

      setFase1(false);
    } else {
      // console.log("error contrasenia");
    }
  };

  const onChange = (event: any) => {
    const dato = event?.target.value;
    setFormData({
      ...formData,
      [event.target.name]: dato,
    });
  };

  const onConfirm = (event: any) => {
    event.preventDefault();
    console.log("holis", verifyCode);
    verifyUser(formData.email, verifyCode, (err, data) => {
      if (err) {
        console.log(err);
      }
      console.log(data);
      setFase1(true);
      setFormData(formDataDefaultValur);
      navigate(RoutesDirectory.HOME);
    });
  };

  return (
    <section className="signinPage">
      <>
        <div
          className="heroLogin"
          style={{ backgroundImage: `url(${heroImg})` }}
        />
        <div className="resiterContainer">
          {fase1 ? (
            <form
              action=""
              className="signInForm form"
              onSubmit={(event) => onSubmit(event)}
            >
              
              <h2>Registrate</h2>

              <div className="input">
                <label htmlFor="">Nombre Completo</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={(event) => onChange(event)}
                  type="text"
                />
              </div>
              <div className="input">
                <label htmlFor="">Correo Electronico</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(event) => onChange(event)}
                />
              </div>
              <div className="input">
                <label htmlFor="">contraseña</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={(event) => onChange(event)}
                />
              </div>
              <div className="input">
                <label htmlFor="">Confirmar contraseña</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(event) => onChange(event)}
                />
              </div>
              <button>Enviar</button>
              {loginError ? <p>Hay un error</p> : null}
            </form>
          ) : (
            <form
              onSubmit={(event) => onConfirm(event)}
              className="confirmationForm form"
            >
              <img src={logInImg} alt="" className="registerImg"/>
              <h3>Confirmacion</h3>
              <div className="input">
              <p>* Ingrese codigo de confirmacion que se envio a su correo electronico, puede estar en su bandeja de spam</p>
                <label htmlFor="">Codigo de Verificacion</label>
              <input
                name="confirmationCode"
                value={verifyCode}
                onChange={(event) => setVerifyCode(event.target.value)}
              />
              </div>
              
              <button type="submit" className="registerBtn">Registrar</button>
            </form>
          )}
        </div>
      </>
    </section>
  );
}
