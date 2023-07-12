

interface PrecioUnitario{insumoId:string, cantidad:number}

export interface Concepto {
    id: string;
    clave: string;
    descripcion: string;
    unidad: string;
    precioUnitario: PrecioUnitario[]; 
  }