import React from "react";
import PageTitle from "../../components/PageTitle";
import "./ListadoInsumos.scss";
import AddButton from "../../components/AddButton";
import { useInsumoStore } from "../../store/projectStore";

export default function ListadoInsumos() {
  const { addInsumo } = useInsumoStore();
  const test = {
    id: "234234",
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
      <div className="insumosGroup"></div>
    </section>
  );
}
