export interface PrecioProyectos{
  proyectoId:string,
  precio:number,
  fechaCreacion:string
}

export interface Insumo {
    id: string;
    clave: string;
    descripcion: string;
    unidad: string;
    precio: number;
    precioProyecto?:PrecioProyectos[]
    categoria: string;
    fechaCreacion: string;
  }