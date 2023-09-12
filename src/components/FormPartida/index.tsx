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
  const [editPartida, setEditPartida] = useState(false)
  const [formError, setFormError] = useState(false);
  // conectar partidaToUpdate, editar useEffect, actualizar workingProject
  // const { partidaToUpdate, setPartidaToUpdate} = usePresupuestoStore()
  const { openModalFormPartida } = useUxStore();
  const {addPartida, workingPartida, setWorkingPartida, updateWorkingPartida}=useWorkingPresupuesto()
  const [formData, setFormData] = useState<Partida>(partidaDefaultValue);
  
   
  

    useEffect(()=>{
      if(workingPartida.id.length>1){
        setFormData(workingPartida)
        setEditPartida(true)
      }else{
        setFormData({
            id: v4(),
            clave: "",
            nombre: "",
            montoPartida: 0,
            listadoConceptos: [],
        })

      }
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


    if(editPartida){
      updateWorkingPartida(formData)
      console.log('esto se actualiza')
    }else{
      addPartida(formData)
    }
    setFormError(false)
    setEditPartida(false)
    onClear()
  };

  const onClear = () => {
    setFormData(partidaDefaultValue)
    setWorkingPartida(partidaDefaultValue)
    openModalFormPartida(false);
  };

  const onCancel = () => {
    onClear();
    openModalFormPartida(false);
  };

  
  return (
    <form onSubmit={(event) => onSubmit(event)} className="form">
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
