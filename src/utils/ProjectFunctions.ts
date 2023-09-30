import { Concepto } from "../types/Concepto";
import { Partida } from "../types/Presupuesto";
 

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

