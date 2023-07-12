import React from "react";
import { v4 } from "uuid";

import PageTitle from "../../components/PageTitle";
import AddButton from "../../components/AddButton";
import { Concepto } from "../../types/Concepto";
import {useConceptoStore} from '../../store/projectStore'

import "./ListadoConceptos.scss";

export default function ListadoConceptos() {
  const {conceptos, addConcepto} = useConceptoStore()
  const test:Concepto = {
    id: v4(),
    clave: "E001",
    descripcion: "Soy un concepto de ejemplo para el listado de conceptos ",
    unidad: "kg",
    precioUnitario: [{insumoId:'',cantidad:1.1},{insumoId:'',cantidad:.15}],
  };

  return (
    <section className="workspace">
      <PageTitle>Mis Conceptos</PageTitle>
      <div className="btn-header">
        <AddButton
          onClick={() => addConcepto(test)}
          bgColor="rgb(31, 57, 204)"
          fontColor={"rgb(255, 255, 255)"}
        >
          Agregar Concepto
        </AddButton>
      </div>

      {
        conceptos?.map(((concepto)=>{
          return(<li key={concepto.id}> {concepto.clave}</li>)
        }))
      }
    </section>
  );
}
