import React, { useState } from "react";
import "./Register.scss";
import heroImg from "../../assets/img/bgLogin3-min.jpg";
import { useNavigate } from "react-router-dom";
import { RoutesDirectory } from "../../routes/router";
import UserPoolCognito, { verifyUser } from "../../utils/UserPool";
import logInImg from "../../assets/img/register_image.svg";

const formDataDefaultValur = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function Register() {
  const [formData, setFormData] = useState(formDataDefaultValur);
  const [loginData, setLoginData] = useState<any>();
  const [registerError, setRegisterError] = useState<any>();
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
        async (err, data) => {
          if (err) {
            setRegisterError(err);
            console.log(err);
          } else {
            setLoginData(data);
            setFormData(formDataDefaultValur);
            navigate(RoutesDirectory.GO_VERIFY_USER(formData.email))
          }
        }
      );
    } else {
      setLoginData('Password and confirmation do not match')
    }
  };
  // console.log("error", registerError);
  // console.log("data", loginData);

  const onChange = (event: any) => {
    const dato = event?.target.value;
    setFormData({
      ...formData,
      [event.target.name]: dato,
    });
  };

 

  const errorMessage = (error:any) => {
    const errors = [
      {message:"Password and confirmation do not match.", esp:"Contraseña y confirmacion no coinciden"},
      {message:"An account with the given email already exists.", esp:"El correo electronico ya ha sido utilizado"},
      {message:"Password did not conform with policy: Password not long enough", esp:"La contraseña no es lo suficientemente larga"},

     
    ];
    
    
    const defaultError = (
        <>La contraseña <br />
        <span> - Debe tener al menos 8 caracteres</span>
        <br />
        <span> - Contar al menos con 1 Mayuscula, 1 Minuscula y 1 Numero</span>``
      </>
    );

    if(error.message===errors[0].message){
      return errors[0].esp
    }
    if(error.message===errors[1].message){
      return errors[1].esp
    }
    if(error.message===errors[2].message){
      return errors[2].esp
    }else{
      
      return defaultError;
    }

     
  };




  return (
    <section className="signinPage">
      <>
        <div
          className="heroLogin"
          style={{ backgroundImage: `url(${heroImg})` }}
        />
        <div className="resiterContainer">
          
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
                <label htmlFor="">Contraseña</label>
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
              {registerError && <div className="errorMessage">{errorMessage(registerError)}</div>}
            </form>
          
        </div>
      </>
    </section>
  );
}
