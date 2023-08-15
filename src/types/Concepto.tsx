

export interface ListadoInsumos{
  insumoId:string, 
  cantidad:number,
  }

export interface Concepto {
    id: string;
    proyectoId?:string;
    fechaCreacion:string;
    clave: string;
    descripcion: string;
    unidad: string;
    cantidad?:number
    listadoInsumos?: ListadoInsumos[]; 
  }