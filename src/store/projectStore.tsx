import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Insumo } from "../types/Insumo";
import { Concepto } from "../types/Concepto";
import { Presupuesto } from "../types/Presupuesto";

interface InsumoState {
  insumos: Insumo[];
  addInsumo: (insumo: Insumo) => void;
  deleteInsumo: (id: string) => void;
  insumoToUpdate: Insumo | undefined;
  setInsumoToUpdate: (insumo: Insumo | undefined) => void;
  updateInsumo: (insumo: Insumo) => void;
}

interface ConceptoState {
  conceptos: Concepto[];
  addConcepto: (concepto: Concepto) => void;
  deleteConcepto: (id: string) => void;
  conceptoToUpdate: Concepto | undefined;
  setConceptoToUpdate: (concepto:Concepto | undefined) => void;
  // updateInsumo: (insumo: Insumo) => void;
}
interface PresupuestoState {
  presupuestos: Presupuesto[];
}

export const useInsumoStore = create<InsumoState>()(
  persist(
    (set) => ({
      insumos: [],
      addInsumo: (insumo: Insumo) =>
        set((state) => ({
          insumos: [...state.insumos, insumo],
        })),
      deleteInsumo: (id: string) => {
        set((state) => ({
          insumos: state.insumos.filter((insumo) => insumo.id !== id),
        }));
      },
      insumoToUpdate: undefined,
      setInsumoToUpdate: (insumo) =>
        set(() => ({
          insumoToUpdate: insumo,
        })),
      updateInsumo:(updateInsumo:Insumo)=>
      set((state)=>({
        insumos: state.insumos.map((insumo) => insumo.id === updateInsumo.id?  updateInsumo: insumo),
       
      }))
    }),
    {
      name: "insumos-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useConceptoStore = create<ConceptoState>()(
  persist(
    (set) => ({
      conceptos: [],
      addConcepto: (concepto: Concepto) =>
        set((state) => ({
          conceptos: [...state.conceptos, concepto],
        })),
      deleteConcepto: (id: string) => {
        set((state) => ({
          conceptos: state.conceptos.filter((concepto) => concepto.id !== id),
        }));
      },
      conceptoToUpdate: undefined,
      setConceptoToUpdate: ((concepto)=>{
        set(()=>({
          conceptoToUpdate: concepto,
        }))
      }),
    }),
    {
      name: "conceptos-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// export const usePresupuestoStore =
