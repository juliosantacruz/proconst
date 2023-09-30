export interface ListadoInsumos {
  insumoId: string; // Insumos en PU
  cantidad: number; // Cantidad en PU
}

 

export interface Concepto {
  id: string;
  proyectoId?: string;
  fechaCreacion: string;
  clave: string;
  descripcion: string;
  unidad: string;
  cantidad?: number; // Cantidad en Presupesto
  listadoInsumos?: ListadoInsumos[];
  precioUnitario?: number;
}
