import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useConceptoStore,
  useInsumoStore,
  usePresupuestoStore,
  useWorkingPresupuesto,
} from "../../store/projectStore";
import { RoutesDirectory } from "../../routes/router";
import { Presupuesto } from "../../types/Presupuesto";
import { Insumo } from "../../types/Insumo";
import { setFormat } from "../../utils/CurrencyFormat";
import { CategoriasInsumos } from "../../utils/SelectInputOptions";

export default function ExplosionInsumos() {
  const { presupuestos } = usePresupuestoStore();
  const { conceptos } = useConceptoStore();
  const { insumos } = useInsumoStore();
  const { setWorkingPresupuesto } = useWorkingPresupuesto();
  const workingProject = useWorkingPresupuesto();

  const navigate = useNavigate();
  const { projectId } = useParams();

  const allConceptos = conceptos;
  const allInsumos = insumos;

  useEffect(() => {
    const projectData = presupuestos.find(
      (project) => project.id === projectId
    );
    if (projectData === undefined) {
      console.log("proyecto no encontrado");
      navigate(RoutesDirectory.HOME);
    } else {
      setWorkingPresupuesto(projectData as Presupuesto);
    }
  }, []);

  interface InsumosExp extends Insumo {
    cantidadTotal: number;
    cantidadInsumo: number;
    cantidadConcepto: number | undefined;
    conceptoId: string;
  }

  const projectInsumos: InsumosExp[] = [];

  workingProject.partidas.map((partida) => {
    partida.listadoConceptos?.map((concepto) => {
      const findConcepto = allConceptos.find(
        (leConcepto) => leConcepto.id === concepto.conceptoId
      );

      if (findConcepto) {
        findConcepto.listadoInsumos?.map((insumo) => {
          const findInsumo = allInsumos.find(
            (leInsumo) => leInsumo.id === insumo.insumoId
          );
          const newInsumo = {
            ...(findInsumo as Insumo),
            cantidadTotal: insumo.cantidad * (concepto.cantidad as number),
            cantidadInsumo: insumo.cantidad,
            conceptoId: concepto.conceptoId,
            cantidadConcepto: concepto.cantidad as number,
          };
          //console.log(newInsumo)
          projectInsumos.push(newInsumo);
        });
      }
    });
  });

  const setInsumosByCategory = (arrInsumos: InsumosExp[], category: string) => {
    const newArr: InsumosExp[] = [];
    arrInsumos.map((insumo) => {
      if (insumo.categoria === category) {
        newArr.push(insumo);
      }
    });
    return newArr;
  };

  const sumatoriaInsumos = (arrInsumos: InsumosExp[]) => {
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

  const costoFinalInsumo = (obj:InsumosExp) =>{
    const total = obj.cantidadTotal*obj.precio
    return total
  }
  const costoFinalCategoria = (arrObj:InsumosExp[]) =>{
    const arrCostoFinalInsumo:number[] = []

    arrObj.map((insumo)=>{
      const costo = costoFinalInsumo(insumo)
      arrCostoFinalInsumo.push(costo)
    })
    const costoCategoria = arrCostoFinalInsumo.reduce((a,b)=> a+b)
    return costoCategoria
  }

  // const materialesInsumos = sumatoriaInsumos(
  //   setInsumosByCategory(projectInsumos, "Materiales")
  // );
  // console.log(materialesInsumos);

  return (
    <section>
      <h2>Explosion de insumos :D</h2>

      <h3>{workingProject.nombreProyecto}</h3>

      <table>
        <thead>
          <tr>
            <th>Clave</th>
            <th>Descripcion</th>
            <th>Unidad</th>
            <th>Costo</th>
            <th>Cantidad</th>
            <th>Total</th>
          </tr>
        </thead>
        
          {CategoriasInsumos.map((objCategoria) => {
            const insumosList = sumatoriaInsumos(
              setInsumosByCategory(projectInsumos, objCategoria.name)
            );
            let costoCategoria:number
            if(insumosList.length>0){
              costoCategoria=costoFinalCategoria(insumosList)
            }else{
              costoCategoria=0
            }

            return (
              <tbody key={objCategoria.name}>
                <tr className="insumoTitle" >
                  <th>{objCategoria.name}</th>
                  <th> </th> 
                  <th> </th> 
                  <th> </th>
                  <th> </th>
                  <th>{setFormat(costoCategoria)} </th>
                </tr>
                {insumosList.length > 0 ? (
                  insumosList.map((insumo) => {
                    return (
                      <tr key={insumo.id}>
                        <td>{insumo.clave}</td>
                        <td>{insumo.descripcion}</td>
                        <td>{insumo.unidad}</td>
                        <td>{setFormat(insumo.precio)}</td>
                        <td>{insumo.cantidadTotal.toFixed(2)}</td>
                        <td>
                          {setFormat(costoFinalInsumo(insumo))}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr><td>no hay insumos</td></tr>
                )}
              </tbody>
            );
          })}
        
      </table>
    </section>
  );
}
