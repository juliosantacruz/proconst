import React, { useEffect, useState } from "react";
import { Presupuesto } from "../../types/Presupuesto";
import { useUxStore } from "../../store/uxStore";
import { usePresupuestoStore, useWorkingPresupuesto } from "../../store/projectStore";
import "./FormPresupuesto.scss";
import { v4 } from "uuid";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { RoutesDirectory } from "../../routes/router";

const presupuestoDefaultValue = {
  id: "",
  fechaCreacion: "",
  nombreProyecto: "",
  descripcionProyecto: "",
  domicilioProyecto: "",
  clienteProyecto: "",
  partidas: [],
  montoTotal: 0.0,
  fsc: {
    costoIndirecto: 0,
    costoOperativo: 0,
    financiamiento: 0,
    utilidad: 0,
    iva: 0,
    isr: 0,
  },
};

// Crear componente Alert (Error, Success, Warning)
const ErrorMsg = () => {
  return (
    <p>
      Error!.. verificar datos, no dejar espacios vacios o numeros negativos
    </p>
  );
};

// Se debe agregar funcion para guardar cambios...

export default function FormPresupuesto() {
  const { openModalFormProject } = useUxStore();
  const {setWorkingPresupuesto} = useWorkingPresupuesto()
  const { addPresupuesto, setPresupuestoToUpdate, presupuestoToUpdate, updatePresupuesto } = usePresupuestoStore();
  const [editInsumo, setEditInsumo] = useState(false)
  const [formData, setFormData] = useState<Presupuesto>(
    presupuestoDefaultValue
  );
  const [formError, setFormError] = useState(false);

  const navigate = useNavigate();
  console.log("formData", formData);

  useEffect(() => {
    if(presupuestoToUpdate !== undefined){
      setFormData(presupuestoToUpdate)
      setEditInsumo(true)
    }else{
       setFormData({
      id: v4(),
      fechaCreacion: dayjs().format("YYYY-MM-DD, h:mm:ss A"),
      nombreProyecto: "",
      descripcionProyecto: "",
      domicilioProyecto: "",
      clienteProyecto: "",
      partidas: [],
      montoTotal: 0.0,
      fsc: {
        costoIndirecto: 1,
        costoOperativo: 1,
        financiamiento: 1,
        utilidad: 1,
        iva: 1,
        isr: 1,
      },
    });
    }
   
  }, []);

  const onChange = (event: any) => {
    const dato = event?.target.value;
    setFormData({
      ...formData,
      [event.target.name]: dato,
    });
  };

  const onChangeFSC = (event:any)=>{
    const value = event?.target.value;
    console.log([event.target.name],value)
    setFormData({
      ...formData,
      fsc:{
        ...formData.fsc,
        [event.target.name]:Number(value)
      }
    })

  }
  

  const onSubmit = (event: any) => {
    event.preventDefault();
    // console.log("newProject", formData);


    if(editInsumo){
      updatePresupuesto(formData)
      setWorkingPresupuesto(formData)
      // console.log('se debe hacer update')
    }else{
      addPresupuesto(formData);
      navigate(RoutesDirectory.GO_WORKING_PRESUPUESTO(formData?.id as string));
    }
    
    setFormError(false)
    setEditInsumo(false)
    onClear();

  };

  const onClear = () => {
    setFormData(presupuestoDefaultValue);
    setPresupuestoToUpdate(undefined)
    openModalFormProject(false);
  };

  const onCancel = () => {
    onClear();
    openModalFormProject(false);
  };

  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <div className="input">
        <label htmlFor="nombreProyecto">Nombre de Proyecto</label>
        <input
          type="text"
          name="nombreProyecto"
          id="nombreProyecto"
          placeholder="Casa los Portales"
          onChange={(event) => onChange(event)}
          value={formData.nombreProyecto}
        />
      </div>
      <div className="input">
        <label htmlFor="descripcionProyecto">Descripcion de Proyecto</label>
        <input
          type="text"
          name="descripcionProyecto"
          id="descripcionProyecto"
          placeholder="Casa habitacion, 3 rec, 2 ba, 3 est, sala, cocina, comedor, lavanderia, estudio"
          onChange={(event) => onChange(event)}
          value={formData.descripcionProyecto}
        />
      </div>
      <div className="input">
        <label htmlFor="domicilioProyecto">Domicilio de Proyecto</label>
        <input
          type="text"
          name="domicilioProyecto"
          id="domicilioProyecto"
          placeholder="Calle Simpre viva #123, Tijuana Mx"
          onChange={(event) => onChange(event)}
          value={formData.domicilioProyecto}
        />
      </div>
      <div className="input">
        <label htmlFor="clienteProyecto">Nombre de Cliente</label>
        <input
          type="text"
          name="clienteProyecto"
          id="clienteProyecto"
          placeholder="Quien es el Cliente?"
          onChange={(event) => onChange(event)}
          value={formData.clienteProyecto}
        />
      </div>
      <div className="fscGroup">
        <div className="input">
          <label htmlFor="costoOperativo">FCD (%)</label>
          <input
            type="number"
            name="costoOperativo"
            id="costoOperativo"
            onChange={(event) => onChangeFSC(event)}
            value={formData.fsc.costoOperativo}
          />
        </div>
        <div className="input">
          <label htmlFor="costoIndirecto">FCI (%)</label>
          <input
            type="number"
            name="costoIndirecto"
            id="costoIndirecto"
            onChange={(event) => onChangeFSC(event)}
            value={formData.fsc.costoIndirecto}
          />
        </div>
        <div className="input financiamiento">
          <label htmlFor="financiamiento">Financiamiento (%)</label>
          <input
            type="number"
            name="financiamiento"
            id="financiamiento"
            onChange={(event) => onChangeFSC(event)}
            value={formData.fsc.financiamiento}
          />
        </div>
        <div className="input">
          <label htmlFor="utilidad">Utilidad (%)</label>
          <input
            type="number"
            name="utilidad"
            id="utilidad"
            onChange={(event) => onChangeFSC(event)}
            value={formData.fsc.utilidad}
          />
        </div>
      </div>
      {formError && <ErrorMsg />}
      <div className="btn-group">
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit">Guardar</button>
      </div>
    </form>
  );
}
