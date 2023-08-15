import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Insumo } from "../types/Insumo";
import { Concepto } from "../types/Concepto";
import { Partida, Presupuesto } from "../types/Presupuesto";

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
  setConceptoToUpdate: (concepto: Concepto | undefined) => void;
  updateConcepto: (concepto: Concepto) => void;
}
interface PresupuestoState {
  presupuestos: Presupuesto[];
  addPresupuesto: (presupuesto: Presupuesto) => void;
  deletePresupuesto: (id: string) => void;
  workingPresupuesto: any;
  setWorkingPresupuesto: (presupuesto: Presupuesto) => void;
  addPartida: (id: string, partida: Partida) => void;
  updatePresupuesto: (presupuesto: Presupuesto) => void;
}

interface WorkingPresupuesto extends Presupuesto {
  setWorkingPresupuesto:(presupuesto:Presupuesto)=>void
  addPartida:(partida:Partida)=>void
  deletePartida:(id:string)=>void
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
      updateInsumo: (updateInsumo: Insumo) =>
        set((state) => ({
          insumos: state.insumos.map((insumo) =>
            insumo.id === updateInsumo.id ? updateInsumo : insumo
          ),
        })),
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
      setConceptoToUpdate: (concepto) => {
        set(() => ({
          conceptoToUpdate: concepto,
        }));
      },
      updateConcepto: (updateConcepto) =>
        set((state) => ({
          conceptos: state.conceptos.map((concepto) =>
            concepto.id === updateConcepto.id ? updateConcepto : concepto
          ),
        })),
    }),
    {
      name: "conceptos-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const usePresupuestoStore = create<PresupuestoState>()(
  persist(
    (set) => ({
      presupuestos: [],
      addPresupuesto: (presupuesto) =>
        set((state) => ({
          presupuestos: [...state.presupuestos, presupuesto],
        })),
      deletePresupuesto: (id) => {
        set((state) => ({
          presupuestos: state.presupuestos.filter(
            (presupuesto) => presupuesto.id !== id
          ),
        }));
      },
      workingPresupuesto: undefined,
      setWorkingPresupuesto: (presupuesto) => {
        set(() => ({
          workingPresupuesto: presupuesto,
        }));
      },
      addPartida: (id: string, partida: Partida) => {
        // set((state) => ({
        //   ...state.workingPresupuesto,
        //   workingPresupuesto: {
        //     ...state.workingPresupuesto,
        //     partida: [
        //       ...(state.workingPresupuesto.partida as Partida[]),
        //       partida,
        //     ],
        //   },
        // }));

        set((state) => ({
          presupuestos: state.presupuestos.map((presupuesto: Presupuesto) =>
            presupuesto.id === id
              ? { ...presupuesto, partida: [...presupuesto.partida, partida] }
              : presupuesto
          ),
        }));
      },
      updatePresupuesto: (newPresupuesto) =>
        set((state) => ({
          presupuestos: state.presupuestos.map((presupuesto) =>
            presupuesto.id === newPresupuesto.id ? newPresupuesto : presupuesto
          ),
        })),
    }),
    {
      name: "presupuesto-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useWorkingPresupuesto = create<WorkingPresupuesto>()(
  persist(
    (set) => ({
      setWorkingPresupuesto:(presupuesto)=>{
        set((state)=>({
          id:presupuesto.id,
          fechaCreacion:presupuesto.fechaCreacion,
          nombreProyecto:presupuesto.nombreProyecto,
          descripcionProyecto: presupuesto.descripcionProyecto,
          domicilioProyecto: presupuesto.domicilioProyecto,
          clienteProyecto: presupuesto.clienteProyecto,
          partida: presupuesto.partida,
          montoTotal: presupuesto.montoTotal,
        }))
      },
      id: "",
      fechaCreacion: "",
      nombreProyecto: "",
      descripcionProyecto: "",
      domicilioProyecto: "",
      clienteProyecto: "",
      partida: [],
      addPartida:(partida)=>{
        set((state)=>({
          partida:[...state.partida, partida]
        }))
      },
      deletePartida:(id)=>{
        set((state)=>({
          partida: state.partida.filter(
            (partida)=> partida.id !== id
          )
        }))
      },
      montoTotal: 0,
    }),
    {
      name: "working-presupuesto-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
