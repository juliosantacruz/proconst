import { useInsumoStore,useConceptoStore,usePresupuestoStore } from "../store/projectStore";
import { Insumo } from "../types/Insumo";


export const SaveInsumos = (dataNew: any) => {
 
  const addInsumo = useInsumoStore.getState().addInsumo
  const insumos = useInsumoStore.getState().insumos


    if (dataNew) {
      const data = new Array(dataNew.insumos);
      // console.log(data)
      data[0]?.map((insumoUploaded: Insumo) => {
        // Revizamos si existe el insumo cargado en la base de datos
        const findInsumo = insumos.find(
          (insumo) => insumo?.id === (insumoUploaded?.id as string)
        );
        if (!findInsumo) {
          addInsumo(insumoUploaded);
        }
      });
    }
  };

  export const SavePresupuesto = ()=>{
    const addPresupuesto = usePresupuestoStore.getState().addPresupuesto
    const presupuestos = usePresupuestoStore.getState().presupuestos

    

  }