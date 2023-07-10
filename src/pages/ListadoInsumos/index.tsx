import React from "react";
import { v4 } from "uuid";

import PageTitle from "../../components/PageTitle";
import "./ListadoInsumos.scss";
import AddButton from "../../components/AddButton";
import { useInsumoStore } from "../../store/projectStore";
import InsumoForm from "../../components/InsumoForm";

export default function ListadoInsumos() {
  const { insumos, addInsumo } = useInsumoStore();
  console.log(insumos)
  const test = {
    id: v4(),
    clave: "001",
    descripcion: "test",
    unidad: "kg",
    precio: 23,
    categoria: "material",
  };
  const handleAddInsumo = () => {
    console.log("Inicio");
    addInsumo(test)
    console.log('fin')
  };
  return (
    <section className="workspace">
      <PageTitle>Mis Insumos</PageTitle>
      <AddButton
        onClick={handleAddInsumo}
        bgColor="rgb(31, 57, 204)"
        fontColor={"rgb(255, 255, 255)"}
      >
        Agregar Insumo
      </AddButton>
      <div className="insumosGroup">

        {insumos.map((element)=>{
          return(<li key={element.id}>{element.descripcion}</li>)
        })}
        <InsumoForm/>
      </div>
    </section>
  );
}
