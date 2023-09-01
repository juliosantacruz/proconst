import React, { useState } from "react";
import "./FormLoad.scss";
import { Insumo } from "../../types/Insumo";
import { useInsumoStore } from "../../store/projectStore";

type UploadJSON = {
  insumos?: Insumo[];
};

export default function FormLoad() {
  const [obj, setObj] = useState<UploadJSON>();
  const [valid, setValid] = useState(false);
  const { insumos, addInsumo } = useInsumoStore();

  const ReadFile = (event: any) => {
    const file = event.target.files[0];

    if (file === undefined) return;
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.readAsText(file);

    fileReader.onload = () => {
      const data = JSON.parse(fileReader.result as any);
      // console.log(typeof(data))
      setObj(data);
      ValidarDatos(data)
        
    };

    fileReader.onerror = () => {
      console.log(fileReader.error);
    };
  };
  console.log(valid)
  const SaveInsumos = (dataNew:any) => {
    if (dataNew) {
      const data = new Array(dataNew.insumos);
      // console.log(data)
      data[0]?.map((insumoUploaded: Insumo) => {
        // Revizamos si existe el insumo cargado en la base de datos
        const findInsumo = insumos.find(
          (insumo) => insumo?.id === (insumoUploaded?.id as string)
        );
        if (!findInsumo) {
          addInsumo(insumoUploaded);
        }
      });
    }
  };

  const ValidarDatos=(data:any)=>{
    // Validaciones para Insumos
  const lol = new Object(data);

  // eslint-disable-next-line no-prototype-builtins
  if (lol.hasOwnProperty("insumos")) {
    console.log("es valido");
    setValid(true)
    SaveInsumos(data)
  } else {
    console.log("archivo no valido");
  }
  }
  

  return (
    <div className="cargarArchivo">
      <label htmlFor="cargar">Cargar Archivo</label>
      <input
        type="file"
        name="cargar"
        id="cargar"
        multiple={false}
        onChange={(event) => ReadFile(event)}
      />
      {/* <button type="button" >
        Cargar
      </button> */}
    </div>
  );
}
