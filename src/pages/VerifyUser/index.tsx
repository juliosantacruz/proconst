import  { useState } from "react";
import "./VerifyUser.scss";
import heroImg from "../../assets/img/bgLogin3-min.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { RoutesDirectory } from "../../routes/router";
import  { verifyUser } from "../../utils/UserPool";
import logInImg from "../../assets/img/register_image.svg";

 

export default function VerifyUser() {
  const [verifyCode, setVerifyCode] = useState("");

 
  const navigate = useNavigate();
  const {email} = useParams()

 

  const onConfirm = (event: any) => {
    event.preventDefault();
    verifyUser(email as string, verifyCode, (err, data) => {
      if (err) {
        // console.log(err);
      }
    //   console.log(data);
      navigate(RoutesDirectory.HOME);
    });
  };

  const errorMessage = (error:any) => {
    const errors = [
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
              onSubmit={(event) => onConfirm(event)}
              className="confirmationForm form"
            >
              <img src={logInImg} alt="" className="registerImg" />
              <h3>Confirmacion</h3>
              <div className="input">
                <p>
                  * Ingrese codigo de confirmacion que se envio a su correo
                  electronico, puede estar en su bandeja de spam
                </p>
                <label htmlFor="">Codigo de Verificacion</label>
                <input
                  name="confirmationCode"
                  value={verifyCode}
                  onChange={(event) => setVerifyCode(event.target.value)}
                />
              </div>

              <button type="submit" className="registerBtn">
                Registrar
              </button>
            </form>
          
        </div>
      </>
    </section>
  );
}
