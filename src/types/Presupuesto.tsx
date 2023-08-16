import { Concepto } from "./Concepto";


export interface ListadoConcepto{
  conceptoId?:string,
  cantidad?:number,
}
export interface Partida {
  id: string;
  clave: string;
  nombre: string;
  montoPartida?: number;
  listadoConceptos?: ListadoConcepto[];
}
export interface Presupuesto {
  id: string;
  fechaCreacion: string;
  nombreProyecto: string;
  descripcionProyecto: string;
  domicilioProyecto: string;
  clienteProyecto: string;
  partidas: Partida[];
  montoTotal: number;
}


