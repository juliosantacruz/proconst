import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Insumo } from "../types/Insumo";
import { Concepto } from "../types/Concepto";
import { ListadoConcepto, Partida, Presupuesto } from "../types/Presupuesto";
import ListadoConceptos from "../pages/ListadoConceptos";

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
  setWorkingPresupuesto: (presupuesto: Presupuesto) => void;
  addPartida: (partida: Partida) => void;
  deletePartida: (id: string) => void;
  workingPartida: Partida;
  setWorkingPartida: (partida: Partida) => void;
  addConceptoPartida: (conceptoPartida: ListadoConcepto) => void;
  deleteConceptoPartida:(id:string)=>void;
  addCantidadConcepto: (
    conceptoId: string,
    cantidad: number,
    partidaId: string,
    montoPartida: number
  ) => void;
  setMontoProyecto: (monto: number) => void;
}

const emptyPartida: Partida = {
  id: "",
  clave: "",
  nombre: "",
  montoPartida: 0,
  listadoConceptos: [],
};

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
          conceptos: state.conceptos.map((concepto: Concepto) =>
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
      presupuestos: [] as any,
      addPresupuesto: (presupuesto) =>
        set((state) => ({
          presupuestos: [...state.presupuestos, presupuesto],
        })),
      deletePresupuesto: (id: string) => {
        set((state) => ({
          presupuestos: state.presupuestos.filter(
            (presupuesto) => presupuesto.id !== id
          ),
        }));
      },
      workingPresupuesto: undefined,
      setWorkingPresupuesto: (presupuesto: Presupuesto) => {
        set(() => ({
          workingPresupuesto: presupuesto,
        }));
      },
      addPartida: (id: string, partida: Partida) => {
        set((state) => ({
          presupuestos: state.presupuestos.map((presupuesto: Presupuesto) =>
            presupuesto.id === id
              ? { ...presupuesto, partidas: [...presupuesto.partidas, partida] }
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
      setWorkingPresupuesto: (presupuesto) => {
        set(() => ({
          id: presupuesto.id,
          fechaCreacion: presupuesto.fechaCreacion,
          nombreProyecto: presupuesto.nombreProyecto,
          descripcionProyecto: presupuesto.descripcionProyecto,
          domicilioProyecto: presupuesto.domicilioProyecto,
          clienteProyecto: presupuesto.clienteProyecto,
          partidas: presupuesto.partidas,
          fsc:{
            costoIndirecto:presupuesto.fsc.costoIndirecto,
            costoOperativo:presupuesto.fsc.costoOperativo,
            financiamiento:presupuesto.fsc.financiamiento,
            utilidad:presupuesto.fsc.utilidad,
            iva:presupuesto.fsc.iva,
            isr:presupuesto.fsc.isr,
          },
          montoTotal: presupuesto.montoTotal,
        }));
      },
      id: "",
      fechaCreacion: "",
      nombreProyecto: "",
      descripcionProyecto: "",
      domicilioProyecto: "",
      clienteProyecto: "",
      partidas: [],
      fsc:{
        costoIndirecto:0,
        costoOperativo:0,
        financiamiento:0,
        utilidad:0,
        iva:0,
        isr:0,
      },
      montoTotal: 0,
      addPartida: (partida) =>
        set((state) => ({
          partidas: [...(state.partidas as Partida[]), partida],
        })),
      deletePartida: (id) =>
        set((state) => ({
          partidas: state.partidas.filter((partida) => partida.id !== id),
        })),
      workingPartida: emptyPartida,
      setWorkingPartida: (partida: Partida) => {
        set(() => ({
          workingPartida: partida,
        }));
      },
      addConceptoPartida: (conceptoPartida: ListadoConcepto) => {
        set((state) => ({
          workingPartida: {
            ...state.workingPartida,
            listadoConceptos: [
              ...(state.workingPartida?.listadoConceptos as any),
              conceptoPartida,
            ],
          },
        })),
          set((state) => ({
            partidas: state.partidas.filter(
              (partida) => partida.id !== state.workingPartida.id
            ),
          })),
          set((state) => ({
            partidas: [...state.partidas, state.workingPartida],
          }));
      },
      deleteConceptoPartida: (id: string) => {
        set((state) => ({
          workingPartida: {
            ...state.workingPartida,
            listadoConceptos: (state.workingPartida.listadoConceptos as any).filter((concepto:ListadoConcepto)=> concepto.conceptoId !==id),
          },
        })),
          set((state) => ({
            partidas: state.partidas.filter(
              (partida) => partida.id !== state.workingPartida.id
            ),
          })),
          set((state) => ({
            partidas: [...state.partidas, state.workingPartida],
          }));
      },
      addCantidadConcepto: (
        leConceptoId,
        leCantidad,
        partidaId,
        montoPartida
      ) => {
        set((state) => ({
          workingPartida: state.partidas.find(
            (partida) => partida.id === partidaId
          ),
        }));
        set((state) => ({
          workingPartida: {
            ...state.workingPartida,
            montoPartida: montoPartida,
            listadoConceptos: state.workingPartida.listadoConceptos?.filter(
              (concepto) => concepto.conceptoId !== leConceptoId
            ),
          },
        })),
          set((state) => ({
            workingPartida: {
              ...state.workingPartida,
              listadoConceptos: [
                ...(state.workingPartida.listadoConceptos as any),
                { conceptoId: leConceptoId, cantidad: leCantidad },
              ],
            },
          })),
          set((state) => ({
            partidas: state.partidas.filter(
              (partida) => partida.id !== state.workingPartida.id
            ),
          })),
          set((state) => ({
            partidas: [...state.partidas, state.workingPartida],
          }));
      },
      setMontoProyecto: (monto) => {
        set(() => ({
          montoTotal: monto,
        }));
      },
    }),
    {
      name: "working-presupuesto-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
