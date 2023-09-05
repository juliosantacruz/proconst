import { v4 } from "uuid";
import {
  useInsumoStore,
  useConceptoStore,
  usePresupuestoStore,
} from "../store/projectStore";
import { Concepto } from "../types/Concepto";
import { Insumo } from "../types/Insumo";
import { ListadoConcepto, Partida, Presupuesto } from "../types/Presupuesto";
import dayjs from "dayjs";

const addPresupuesto = usePresupuestoStore.getState().addPresupuesto;
// const presupuestos = usePresupuestoStore.getState().presupuestos;

const addConcepto = useConceptoStore.getState().addConcepto;
// const conceptos = useConceptoStore.getState().conceptos;

const addInsumo = useInsumoStore.getState().addInsumo;
const insumos = useInsumoStore.getState().insumos;

export type ImportFile = {
  insumos?: Insumo[];
  conceptos?: Concepto[];
  presupuesto?: Presupuesto;
};

export const importFile = (obj: ImportFile) => {
  type DirectorioConceptos = { oldId: string; newId: string };

  const conceptosPresupuesto: DirectorioConceptos[] = [];
  let newProyectId: string;
  if (obj.presupuesto) {
    const newPartidas: Partida[] = [];

    obj.presupuesto.partidas.map((uploadPartida) => {
      const newListadoConcepto: ListadoConcepto[] = [];

      uploadPartida.listadoConceptos?.map((concepto) => {
        const newConceptoId = v4();
        const newConcepto = { ...concepto, conceptoId: newConceptoId };

        newListadoConcepto.push(newConcepto);

        if (concepto.conceptoId)
          conceptosPresupuesto.push({
            oldId: concepto.conceptoId,
            newId: newConceptoId,
          });
      });

      const newPartida: Partida = {
        ...uploadPartida,
        listadoConceptos: newListadoConcepto,
      };

      newPartidas.push(newPartida);
    });

    const newPresupuesto: Presupuesto = {
      ...obj.presupuesto,
      id: v4(),
      fechaCreacion: dayjs().format("YYYY-MM-DD, h:mm:ss A"),
      nombreProyecto: `${obj.presupuesto.nombreProyecto}_${dayjs().format(
        "YYYY-MM-DD"
      )}`,
      partidas: newPartidas,
    };
    newProyectId = newPresupuesto.id;

    console.log("newPresupuesto", newPresupuesto);
    // console.log("dirConceptos", conceptosPresupuesto);
    addPresupuesto(newPresupuesto)
  }
  // const newConceptos: Concepto[] = [];
  if (obj.conceptos) {
    console.log("uploadConceptos", obj.conceptos);
    const data = obj.conceptos;

    data?.map((uploadConcepto: Concepto) => {
      // Cambiamos el concepto id
      const newId = conceptosPresupuesto.find(
        (concepto) => concepto.oldId === uploadConcepto.id
      )?.newId as string;
      const newConcepto: Concepto = {
        ...uploadConcepto,
        id: newId,
        proyectoId: newProyectId,
      };
      //newConceptos.push(newConcepto);
      addConcepto(newConcepto)
    });
  }
  
  // console.log("newConceptos", newConceptos);

  if(obj.insumos){
    const data = obj.insumos
    data.map((uploadInsumo)=>{

      const findInsumo=insumos.find((oldInsumo)=>oldInsumo.id===uploadInsumo.id)
      if(!findInsumo){
        addInsumo(uploadInsumo)
      }
    })
     
  }
};
