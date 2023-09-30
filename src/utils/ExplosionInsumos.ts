import { InsumosExp } from "../types/Insumo";


export const setInsumosByCategory = (arrInsumos: InsumosExp[], category: string) => {
    const newArr: InsumosExp[] = [];
    arrInsumos.map((insumo) => {
      if (insumo.categoria === category) {
        newArr.push(insumo);
      }
    });
    return newArr;
  };
  
  export const sumatoriaInsumos = (arrInsumos: InsumosExp[]) => {
    const resultado: InsumosExp[] = [];
  
    // Iteramos sobre el array original
    arrInsumos.forEach((insumo) => {
      // Buscamos si ya existe un insumo con el mismo id en el resultado
      const insumoExistente = resultado.find(
        (resultadoInsumo) => resultadoInsumo.id === insumo.id
      );
  
      if (insumoExistente) {
        // Si existe, sumamos la cantidad del insumo al existente
        insumoExistente.cantidadTotal += insumo.cantidadTotal;
      } else {
        // Si no existe, agregamos el insumo al resultado
        resultado.push({ ...insumo });
      }
    });
  
    return resultado;
  };
  
  export const costoFinalInsumo = (obj: InsumosExp) => {
    const total = obj.cantidadTotal * obj.precio;
    return total;
  };
  
  export const costoFinalCategoria = (arrObj: InsumosExp[]) => {
    const arrCostoFinalInsumo: number[] = [];
  
    arrObj.map((insumo) => {
      const costo = costoFinalInsumo(insumo);
      arrCostoFinalInsumo.push(costo);
    });
    const costoCategoria = arrCostoFinalInsumo.reduce((a, b) => a + b);
    return costoCategoria;
  };
  
  
  