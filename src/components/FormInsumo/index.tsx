// React
import  { useState, useEffect } from "react";

// Librerias
import { v4 } from "uuid";
import dayjs from 'dayjs'

// Local Reference
import { useInsumoStore } from "../../store/projectStore";
import { useUxStore } from "../../store/uxStore";
import { Unidades, CategoriasInsumos } from "../../utils/SelectInputOptions";

// Types
import { Insumo } from "../../types/Insumo";

// Styles
import "./FormInsumo.scss";


const insumoDefaultValue = {
  id: "",
  clave: "",
  descripcion: "",
  unidad: "",
  precio: 0.0,
  categoria: "",
  fechaCreacion:''
};

const ErrorMsg = () => {
  return <p>Error!.. verificar datos, no dejar espacios vacios o numeros negativos</p>;
};
 

export default function FormInsumo() {
  const [editInsumo, setEditInsumo] = useState(false)
  const [formError, setFormError] = useState(false);
  const { openModalFormInsumo} = useUxStore()

  const { addInsumo, insumoToUpdate, setInsumoToUpdate, updateInsumo } = useInsumoStore();
  const [formData, setFormData] = useState<Insumo>(insumoDefaultValue);
  
  useEffect(() => {
    if (insumoToUpdate !== undefined){
      setFormData(insumoToUpdate)
      setEditInsumo(true)
    }else{
      setFormData({
      id: v4(),
      clave: "",
      descripcion: "",
      unidad: "",
      precio: 0.0,
      categoria: "",
      fechaCreacion: dayjs().format('YYYY-MM-DD, h:mm:ss A')
    });
    }
    
  }, []);

  const onSubmit = (event: any) => {
    event.preventDefault();

    // Form Validations (No empty arrays)
    if (formData.clave === "" ||formData.descripcion === "" || formData.unidad === "" || formData.categoria === "") {
      console.log(formData);
      setFormError(true)
      return console.log("error de datos");

    } 
    // Form Validations (No negative numbers)

    if (formData.precio<0){
      console.log(formData.precio);
      setFormError(true)
      return console.log("No puedes tener numero negativo");
    }

    if(editInsumo){
      updateInsumo(formData)
    }else{
      addInsumo(formData);
    }

    
    setFormError(false)
    setEditInsumo(false)
    onClear();    
  };

  const onChange = (event: any) => {
    const dato = event?.target.value;

    // Precio Validations
    if (event.target.name === "precio") {
      setFormData({
        ...formData,
        [event.target.name]: Number(dato),
      });
    }
    setFormData({
      ...formData,
      [event.target.name]: dato,
    });
  };

  const onClear = () => {
    setFormData(insumoDefaultValue);

    setInsumoToUpdate(undefined)
    openModalFormInsumo(false);
  };

  const onCancel = () => {
    onClear();
    openModalFormInsumo(false);
  };

  return (
    <form onSubmit={(event) => onSubmit(event)} className="form">
      <div className="input">
        <label htmlFor="clave">Clave</label>
        <input
          type="text"
          name="clave"
          id="clave"
          placeholder="MT001"
          onChange={(event) => onChange(event)}
          value={formData.clave}
        />
      </div>
      <div className="input">
        <label htmlFor="descripcion">Descripcion</label>
        <textarea
          // type="text"
          name="descripcion"
          id="descripcion"
          placeholder="Acero de refuerzo #6"
          onChange={(event) => onChange(event)}
          value={formData.descripcion}
        />
      </div>
      {/* <div className="input">
        <label htmlFor="unidad">Unidad</label>
        <input
          type="text"
          name="unidad"
          id="unidad"
          placeholder="kg"
          onChange={(event) => onChange(event)}
          value={formData.unidad}
        />
      </div> */}
      <div className="input">
        <label htmlFor="unidad">Unidad</label>
        <select
          name="unidad"
          id="unidad"
          onChange={(event) => onChange(event)}
          value={formData.unidad}
        >
          <option value="m2"></option>
          {Unidades.map((unidad) => {
            return (
              <option value={unidad.simbol} key={unidad.name}>
                {unidad.simbol}
              </option>
            );
          })}
        </select>
      </div>
      <div className="input">
        <label htmlFor="precio">Precio</label>
        <input
          type="number"
          name="precio"
          id="precio"
          placeholder="$0.00"
          onChange={(event) => onChange(event)}
          value={formData.precio}
        />
      </div>
      {/* <div className="input">
        <label htmlFor="categoria">Categoria</label>
        <input
          type="text"
          name="categoria"
          id="categoria"
          placeholder="Materiales"
          onChange={(event) => onChange(event)}
          value={formData.categoria}
        />
      </div> */}
      <div className="input">
        <label htmlFor="categoria">Categoria</label>
        <select
          name="categoria"
          id="categoria"
          onChange={(event) => onChange(event)}
          value={formData.categoria}
        >
          <option value="m2"></option>
          {CategoriasInsumos.map((Categoria) => {
            return (
              <option value={Categoria.name} key={Categoria.simbol}>
                {Categoria.name}
              </option>
            );
          })}
        </select>
      </div>
      {formError&&
      
      <ErrorMsg />
      }
      <div className="btn-group">
        <button type="button" onClick={onCancel} className="cancelBtn">
          Cancelar
        </button>
        <button type="submit" className="successBtn">Guardar</button>
      </div>
    </form>
  );
}
