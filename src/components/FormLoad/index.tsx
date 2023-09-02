import React, { useState } from "react";
import "./FormLoad.scss";
import { Insumo } from "../../types/Insumo";
import { useInsumoStore } from "../../store/projectStore";
import { useUxStore } from "../../store/uxStore";
import { Concepto } from "../../types/Concepto";
import { Presupuesto } from "../../types/Presupuesto";

type UploadJSON = {
  insumos?: Insumo[];
  conceptos?:Concepto[];
  presupuesto?:Presupuesto
};

export default function FormLoad() {
  const [obj, setObj] = useState<UploadJSON>();
  const [valid, setValid] = useState(false);
  const [message, setMessage] = useState("");
  const { insumos, addInsumo } = useInsumoStore();
  const { modalFormLoad, openModalFormLoad } = useUxStore();

  const SetFileData = (event: any) => {
    const file = event.target.files[0];
    const fileName =file.name
    const fileExtension = fileName.split('.')[1]
    if(fileExtension!=='json'){
      setMessage(`${fileName} Archivo invalido, extension .${fileExtension} no valida`)
      return
    }else{
      setMessage('')
    }
    if (file === undefined) return;
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.readAsText(file);

    fileReader.onload = () => {
      const data = JSON.parse(fileReader.result as any);
      ValidarDatos(data);
    };

    fileReader.onerror = () => {
      console.log(fileReader.error);
    };
  };

  const ValidarDatos = (data: any) => {
    // Validaciones para Insumos
    const lol = new Object(data);

    // eslint-disable-next-line no-prototype-builtins
    if (lol.hasOwnProperty("insumos")) {
      setMessage("Archivo Valido");
      setValid(true);
      setObj(data);
    } else {
      setMessage("Archivo no valido");
    }
  };

  const ReadFile = () => {
    SaveInsumos(obj);
    onClear();
  };

  const onClear = () => {
    openModalFormLoad(false);
  };

  const SaveInsumos = (dataNew: any) => {
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

  return (
    <div className="cargarArchivo">
      <label htmlFor="cargar">Cargar Archivo</label>
      <input
        type="file"
        name="cargar"
        id="cargar"
        multiple={false}
        onChange={(event) => SetFileData(event)}
      />
      {message.length > 0 ? <p>{message}</p> : <p> </p>}
      <div className="btnGroup">
        <button type="button" className="cargarBtn onCancel" onClick={onClear}>
          Cancelar
        </button>
        <button type="button" className="cargarBtn" onClick={ReadFile}>
          Cargar
        </button>
      </div>
    </div>
  );
}
