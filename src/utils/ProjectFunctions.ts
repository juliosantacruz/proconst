import { Concepto } from "../types/Concepto";
import { Partida, Presupuesto } from "../types/Presupuesto";
import {saveAs} from 'file-saver'
import * as dayjs from 'dayjs'
import { Insumo } from "../types/Insumo";


// Obtiene el monto por partida
// Recibe la Partida en cuestion y todos los conceptos del proyecto
export const montoPartidaF = (
  partida: Partida,
  allProjectConcepts: Concepto[]
) => {
  const listadoConceptos = partida.listadoConceptos;
  const arrMontoConcepto: number[] = [];
  const projectConceptos = allProjectConcepts;

  listadoConceptos?.map((concepto) => {
    const { cantidad, conceptoId } = concepto;
    const pu = projectConceptos.find(
      (concepto) => concepto.id === conceptoId
    )?.precioUnitario;
    const monto = (pu as number) * (cantidad as number);
    arrMontoConcepto.push(monto);
  });

  const montoPartidaFinal = arrMontoConcepto.reduce((a, b) => a + b, 0);
  return montoPartidaFinal;
};

// Obtiene el monto por partida
// Recibe la Partida en cuestion y todos los conceptos del proyecto
// Recibe la cantidad del concepto
export const montoPartidaCant = (
  partida: Partida,
  allProjectConcepts: Concepto[],
  cantidadConcepto:number,
  conceptoToChange:string
) => {
   
  const listadoConceptos = partida.listadoConceptos;
  const arrMontoConcepto: number[] = [];
  const projectConceptos = allProjectConcepts;

  listadoConceptos?.map((concepto) => {
    const { conceptoId, cantidad } = concepto;
    const pu = projectConceptos.find(
      (concepto) => concepto.id === conceptoId
    )?.precioUnitario;
    
    let monto: number
    if(conceptoToChange===concepto.conceptoId){
      monto = (pu as number) * (cantidadConcepto as number);
      arrMontoConcepto.push(monto);
    }else{
      monto = (pu as number) * (cantidad as number);
      arrMontoConcepto.push(monto);
    }

  });

  const montoPartidaFinal = arrMontoConcepto.reduce((a, b) => a + b, 0);
  return montoPartidaFinal;
};
// Obtiene el monto por partida
// Recibe la Partida en cuestion y todos los conceptos del proyecto
// Recibe la cantidad del concepto
export const sumMontoPartida  = (
  partida: Partida,
  allProjectConcepts: Concepto[],
   
) => {
   
  const listadoConceptos = partida.listadoConceptos;
  const arrMontoConcepto: number[] = [];
  const projectConceptos = allProjectConcepts;

  listadoConceptos?.map((concepto) => {
    const { conceptoId, cantidad } = concepto;
    const pu = projectConceptos.find(
      (concepto) => concepto.id === conceptoId
    )?.precioUnitario;
    const monto = (pu as number) * (cantidad as number);
    arrMontoConcepto.push(monto);
  });

  const montoPartidaFinal = arrMontoConcepto.reduce((a, b) => a + b, 0);
  return montoPartidaFinal;
};

// Esta funcion regresa montoProyecto
// recibe array de partidas 
export const montoProyecto =(partidas:Partida[])=>{
    const arrMontoProyecto:number[]=[]
    partidas.map((partida)=>{
        arrMontoProyecto.push(partida.montoPartida as number)
    })
    const montoProyectoFinal = arrMontoProyecto.reduce((a, b) => a + b, 0);
    return montoProyectoFinal
}

// export Json File Project

export const createJSONFile=(project:Presupuesto)=>{
  const blob = new Blob([JSON.stringify(project)], {type:'application/json;charset=utf-8'})
  saveAs(blob, `export_${project.nombreProyecto}_${dayjs().format('YYYY-MM-DD')}.json`)
}

// export Json File Insumos

export const createJSONFileInsumos=(Insumos:Insumo[])=>{   

  const blob = new Blob([JSON.stringify(Insumos)], {type:'application/json;charset=utf-8'})
  saveAs(blob, `export_Insumos_${dayjs().format('YYYY-MM-DD')}.json`)
}

