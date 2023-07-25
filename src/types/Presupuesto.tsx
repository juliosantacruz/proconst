import { Concepto } from "./Concepto"


export interface PartidaP{
    id:string,
    clave:string,
    nombre:string,
    montoPartida:number,
    listadoConceptos: Concepto[]
}
export interface Presupuesto{
    id: string,
    fechaCreacion:string,
    nombreProyecto:string,
    descripcionProyecto:string,
    domicilioProyecto:string,
    clienteProyecto:string,
    partida: PartidaP[]
    montoTotal:number 
}