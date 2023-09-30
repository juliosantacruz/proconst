import { Concepto } from "../types/Concepto";
import {  Presupuesto } from "../types/Presupuesto";
import { Insumo } from "../types/Insumo";
import {saveAs} from 'file-saver'
import dayjs from 'dayjs'

// export Json File Project

export const createJSONFile=(project:Presupuesto)=>{
    const blob = new Blob([JSON.stringify(project)], {type:'application/json;charset=utf-8'})
    saveAs(blob, `export_${project.nombreProyecto}.json`)
  }
  
  // export Json File Insumos
  
  // export const createJSONFileInsumos=(Insumos:Insumo[])=>{   
  //   console.log('esto inicia')
  //   const insumoToExport = {insumos:Insumos}
  //   const blob = new Blob([JSON.stringify(insumoToExport)], {type:'application/json;charset=utf-8' })
  //   saveAs(blob, `export_Insumos_${dayjs().format('YYYY-MM-DD')}.json`)
  // }
  
  export async function createJSONFileInsumos(insumos: Insumo[]) {
    console.log('esto inicia');
    const insumoToExport = {insumos: insumos};
    const blob = await new Blob([JSON.stringify(insumoToExport)], {type: 'application/json;charset=utf-8'});
    await saveAs(blob, `export_Insumos_${dayjs().format('YYYY-MM-DD')}.json`);
  }
  
  
  // export Json File Project Full
  export const createPresupuestoJSON=(project:Presupuesto, conceptos:Concepto[], insumos:Insumo[])=>{
  
    const findConcepto = () => {
      const arrConceptosId: string[] = []
      project.partidas?.map((partida)=>{
        partida.listadoConceptos?.map((concepto)=>{
          arrConceptosId.push(concepto.conceptoId as string)
        })
      }) 
      
      const arrConceptos:Concepto[] =[]
      arrConceptosId.map((conceptoId)=>{
        conceptos.map((concepto)=>{
          if(conceptoId===concepto.id){
            arrConceptos.push(concepto)
          }
        })
      })
      return arrConceptos
    }
  
    const findInsumos = () =>{
      const conceptosPresupuesto:Concepto[] = findConcepto()
      const arrInsumosId:string[] = []
      conceptosPresupuesto.map((concepto)=>{
        concepto.listadoInsumos?.map((insumo)=>{
          arrInsumosId.push(insumo.insumoId)
        })
      })
      const arrUniqueInsumosId:string[]= arrInsumosId.filter((insumoId, index)=>{
        return arrInsumosId.indexOf(insumoId)===index
      })
  
      const arrInsumos:Insumo[]=[]
      arrUniqueInsumosId.map((conceptoId)=>{
        insumos.map((insumo)=>{
          if(insumo.id===conceptoId){
            arrInsumos.push(insumo)
          }
        })
      })
  
      return arrInsumos
    }
  
    const fileObject ={
      presupuesto:project,
      conceptos:findConcepto(),
      insumos:findInsumos()
    }
    const setName =()=>`export_${project.nombreProyecto}_${dayjs().format('YYYY-MM-DD')}.json`
  
    const blob = new Blob([JSON.stringify(fileObject)], {type:'application/json;charset=utf-8'})
    saveAs(blob, setName())
  }

  export const createPresupuetoCVS= (project:Presupuesto)=>{
    const fileObject={
      project
    }

    const setName =()=>`export_${project.nombreProyecto}_${dayjs().format('YYYY-MM-DD')}.csv`
    // const csv = convertProjectToCSV(project)
    const blob = new Blob([JSON.stringify(fileObject)], {type:'text/csv;charset=utf-8;'})
    saveAs(blob, setName())
  }