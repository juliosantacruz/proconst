import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface Insumo {
  id: string;
  clave: string;
  descripcion: string;
  unidad: string;
  precio: number;
  categoria: string;
}

interface InsumoState {
  insumos: Insumo[];
  addInsumo: (insumo: Insumo) => void;
  //   deleteInsumo: (insumo: Insumo) => void;
  //   updateInsumo: (insumo: Insumo) => void;
}

export const useInsumoStore = create<InsumoState>()(
  persist(
    (set) => ({
      insumos: [],
      addInsumo: (insumo: Insumo) =>
        set((state) => ({
          insumos: [...state.insumos, insumo],
        })),
    }),
    {
      name: "insumos-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
