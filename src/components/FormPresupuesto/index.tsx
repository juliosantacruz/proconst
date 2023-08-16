import React, { useEffect, useState } from "react";
import { Presupuesto } from "../../types/Presupuesto";
import { useUxStore } from "../../store/uxStore";
import { usePresupuestoStore } from '../../store/projectStore'

import { v4 } from "uuid";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { RoutesDirectory } from "../../routes/router";

const presupuestoDefaultValue = {
  id: "",
  fechaCreacion: "",
  nombreProyecto: "",
  descripcionProyecto:"",
  domicilioProyecto: "",
  clienteProyecto: "",
  partidas: [],
  montoTotal: 0.0,
};

// Crear componente Alert (Error, Success, Warning)
const ErrorMsg = () => {
  return (
    <p>
      Error!.. verificar datos, no dejar espacios vacios o numeros negativos
    </p>
  );
};

export default function FormPresupuesto() {
  const { openModalFormProject } = useUxStore();
  const {addPresupuesto} = usePresupuestoStore()
  const [formData, setFormData] = useState<Presupuesto>(
    presupuestoDefaultValue
  );
  const [formError, setFormError] = useState(false);

  const navigate = useNavigate()
  console.log('formData', formData)

  useEffect(() => {
    setFormData({
      id: v4(),
      fechaCreacion: dayjs().format("YYYY-MM-DD, h:mm:ss A"),
      nombreProyecto: "",
      descripcionProyecto:'',
      domicilioProyecto: "",
      clienteProyecto: "",
      partidas: [],
      montoTotal: 0.0,
    });
  }, []);

  const onChange = (event: any) => {
    const dato = event?.target.value;

    setFormData({
      ...formData,
      [event.target.name]: dato,
    });
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    console.log("newProject", formData);
    addPresupuesto(formData)
    navigate(RoutesDirectory.GO_WORKING_PRESUPUESTO(formData?.id as string))
    onClear()
  };

  const onClear = () => {
    setFormData(presupuestoDefaultValue);
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
