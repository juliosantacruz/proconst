import { Concepto } from "./Concepto"


export interface Partida{
    id:string,
    clave:string,
    nombre:string,
    montoPartida?:number,
    listadoConceptos?: Concepto[]
}
export interface Presupuesto{
    id: string,
    fechaCreacion:string,
    nombreProyecto:string,
    descripcionProyecto:string,
    domicilioProyecto:string,
    clienteProyecto:string,
    partida: Partida[]
    montoTotal:number 
}