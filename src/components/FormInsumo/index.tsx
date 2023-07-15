import React, { useState, useRef } from "react";
import { Insumo } from "../../types/Insumo";
import { v4 } from "uuid";
import "./FormInsumo.scss";
import { useInsumoStore } from "../../store/projectStore";

const insumoDefaultValue = {
  id: v4(),
  clave: "",
  descripcion: "",
  unidad: "",
  precio: 0.00,
  categoria: "",
};

export default function InsumoForm({setSpreadModal}:any) {
  const { addInsumo } = useInsumoStore();
  const [formData, setFormData] = useState<Insumo>(insumoDefaultValue);

  const onSubmit = (event: any) => {
    event.preventDefault();
    addInsumo(formData); 
    onClear()
  };

  const onChange = (event: any) => {
    const dato = event?.target.value;
    setFormData({
      ...formData,
      [event.target.name]: dato,
    });
  };

  const onClear = () => {
    setFormData(insumoDefaultValue);
  };

  const onCancel = () => {
    onClear()
    setSpreadModal(false)
  }

  return (
    <form onSubmit={(event) => onSubmit(event)}>
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
        <input
          type="text"
          name="descripcion"
          id="descripcion"
          placeholder="Acero de refuerzo #6"
          onChange={(event) => onChange(event)}
          value={formData.descripcion}
        />
      </div>
      <div className="input">
        <label htmlFor="unidad">Unidad</label>
        <input
          type="text"
          name="unidad"
          id="unidad"
          placeholder="kg"
          onChange={(event) => onChange(event)}
          value={formData.unidad}
        />
      </div>
      <div className="input">
        <label htmlFor="precio">Precio</label>
        <input
          type="text"
          name="precio"
          id="precio"
          placeholder="$0.00"
          onChange={(event) => onChange(event)}
          value={formData.precio}
        />
      </div>
      <div className="input">
        <label htmlFor="categoria">Categoria</label>
        <input
          type="text"
          name="categoria"
          id="categoria"
          placeholder="Materiales"
          onChange={(event) => onChange(event)}
          value={formData.categoria}
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
