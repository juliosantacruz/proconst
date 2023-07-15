import React, { useState } from "react";
import { v4 } from "uuid"; 
import PageTitle from "../../components/PageTitle";
import AddButton from "../../components/AddButton";
import { Concepto } from "../../types/Concepto";
import { useConceptoStore } from "../../store/projectStore";

import "./ListadoConceptos.scss";
import AsideModal from "../../components/AsideModal";
import FormConcepto from "../../components/FormConcepto";

export default function ListadoConceptos() {
  const [spreadModal, setSpreadModal] = useState(false);

  const { conceptos, addConcepto, deleteConcepto } = useConceptoStore();
  const test: Concepto = {
    id: v4(),
    clave: "E001",
    descripcion: "Soy un concepto de ejemplo para el listado de conceptos ",
    unidad: "kg",
    precioUnitario: [
      { insumoId: "", cantidad: 1.1 },
      { insumoId: "", cantidad: 0.15 },
    ],
  };

  const handleAddConcepto = () => {
    console.log("Inicio");
    setSpreadModal(true);
    console.log("fin");
  };

  const handleDelete = (id:string)=>{
    deleteConcepto(id)
  }

  return (
    <section className="workspace">
      <PageTitle>Mis Conceptos</PageTitle>
      <div className="btn-header">
        <AddButton
          onClick={handleAddConcepto}
          bgColor="rgb(31, 57, 204)"
          fontColor={"rgb(255, 255, 255)"}
        >
          Agregar Concepto
        </AddButton>
      </div>

      {conceptos?.map((concepto) => {
        return <li key={concepto.id}> {concepto.clave} - {concepto.descripcion} <button onClick={()=>handleDelete(concepto.id)}>Eliminar</button></li>;
      })}

      <AsideModal
      widthModal={'70vw'}
        spreadModal={spreadModal}
        setSpreadModal={setSpreadModal}
        title="Agregar Concepto"
      >
        <FormConcepto setSpreadModal={setSpreadModal}/>
      </AsideModal>
    </section>
  );
}
