

export interface PrecioUnitario{
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
    precioUnitario?: PrecioUnitario[]; 
  }