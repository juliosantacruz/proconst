

export interface ConceptoP{
    ConceptoId:string,
    precioConcept:number,
    cantidad: number,
}

export interface PartidaP{
    nombre:string,
    listadoConceptos: ConceptoP[]
}
export interface Presupuesto{
    id: string,
    nombreProyecto:string,
    domicilioProyecto:string,
    clienteProyecto:string,
    partida: PartidaP
}