import { Concepto } from "../types/Concepto";
import { Partida } from "../types/Presupuesto";

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

export const montoPartidaCant = (
  partida: Partida,
  allProjectConcepts: Concepto[],
  cantidad: number
) => {
  const listadoConceptos = partida.listadoConceptos;
  const arrMontoConcepto: number[] = [];
  const projectConceptos = allProjectConcepts;

  listadoConceptos?.map((concepto) => {
    const { conceptoId } = concepto;
    const pu = projectConceptos.find(
      (concepto) => concepto.id === conceptoId
    )?.precioUnitario;
    const monto = (pu as number) * (cantidad as number);
    arrMontoConcepto.push(monto);
  });

  const montoPartidaFinal = arrMontoConcepto.reduce((a, b) => a + b, 0);
  return montoPartidaFinal;
};
