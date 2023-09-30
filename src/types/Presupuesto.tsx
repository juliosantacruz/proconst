
export interface FactorSobreCosto{
  costoIndirecto:number,
  costoOperativo:number,
  financiamiento:number,
  utilidad:number,
  iva:number,
  isr:number,
}
 
export interface ListadoConcepto{
  fechaCreacion:string
  conceptoId:string,
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
  fsc:FactorSobreCosto;
}


