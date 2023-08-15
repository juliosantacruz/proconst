import React, { useEffect, useState } from "react";
import { Partida } from "../../types/Presupuesto";
import { useUxStore } from "../../store/uxStore";

import { v4 } from "uuid";
import { usePresupuestoStore, useWorkingPresupuesto } from "../../store/projectStore";

const partidaDefaultValue = {
  id: "",
  clave: "",
  nombre: "",
  montoPartida: 0,
  listadoConceptos: [],
};

export default function FormPartida({projectId}:any) {
  const { openModalFormPartida } = useUxStore();
  const {addPartida}=useWorkingPresupuesto()
  const [formData, setFormData] = useState<Partida>(partidaDefaultValue);
  
   
  

    useEffect(()=>{
        setFormData({
            id: v4(),
            clave: "",
            nombre: "",
            montoPartida: 0,
            listadoConceptos: [],
        })
    },[])


  const onChange = (event: any) => {
    const dato = event?.target.value;

    setFormData({
      ...formData,
      [event.target.name]: dato,
    });
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    // console.log("newProject", formData);
    addPartida(formData)
    onClear()
  };

  const onClear = () => {
    openModalFormPartida(false);
  };

  const onCancel = () => {
    onClear();
    openModalFormPartida(false);
  };

  
  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <div className="input">
        <label htmlFor="clave">Clave</label>
        <input
          type="text"
          name="clave"
          id="clave"
          placeholder="Casa los Portales"
          onChange={(event) => onChange(event)}
          value={formData.clave}
        />
      </div>
      <div className="input">
        <label htmlFor="nombre">Nombre Partida</label>
        <input
          type="text"
          name="nombre"
          id="nombre"
          placeholder="Casa los Portales"
          onChange={(event) => onChange(event)}
          value={formData.nombre}
        />
      </div> 
      <div className="btn-group">
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit">Guardar</button>
      </div>
    </form>
  );
}
