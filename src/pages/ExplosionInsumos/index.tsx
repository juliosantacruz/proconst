import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useConceptoStore,
  useInsumoStore,
  usePresupuestoStore,
  useWorkingPresupuesto,
} from "../../store/projectStore";
import { RoutesDirectory } from "../../routes/router";
import { Presupuesto } from "../../types/Presupuesto";
import { Insumo, InsumosExp } from "../../types/Insumo";
import { setFormat } from "../../utils/CurrencyFormat";
import { CategoriasInsumos } from "../../utils/SelectInputOptions";
import "./ExplosionInsumos.scss";
import ChartDougnut from "../../components/ChartDougnut";
import {
  costoFinalCategoria,
  costoFinalInsumo,
  setInsumosByCategory,
  sumatoriaInsumos,
} from "../../utils/ExplosionInsumos";
import Navbar from "../../layout/TopMenu/Navbar";

export default function ExplosionInsumos() {
  const [explotarTareas, setExplotarTareas] = useState(false);
  const { presupuestos } = usePresupuestoStore();
  const { conceptos } = useConceptoStore();
  const { insumos } = useInsumoStore();
  const { setWorkingPresupuesto } = useWorkingPresupuesto();
  const workingProject = useWorkingPresupuesto();

  const navigate = useNavigate();
  const { projectId } = useParams();
  console.log("id", projectId);
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

  const handleExplotarTareas = () => {
    setExplotarTareas(!explotarTareas);

    console.log("explotar tareas");
  };

  // const materialesInsumos = sumatoriaInsumos(
  //   setInsumosByCategory(projectInsumos, "Materiales")
  // );
  // console.log(materialesInsumos);

  return (
    <section className="workspace explosionInsumosPage">
      <Navbar>
        <button
          className={explotarTareas ? "explotarBtn active" : "explotarBtn"}
          onClick={handleExplotarTareas}
        >
          Explotar Tareas
        </button>
      </Navbar>
      <div className="header">
        <h2>Explosion de insumos :D</h2>
      </div>

      <h3>{workingProject.nombreProyecto}</h3>

      <div className="explosionInsumos">
        <div className="chart">
          <ChartDougnut arrInsumos={projectInsumos} />
        </div>

        <table className="tableDefault listadoInsumos">
          <thead>
            <tr>
              <th>Clave</th>
              <th>Descripcion</th>
              <th>Unidad</th>
              <th>Costo</th>
              <th>Cantidad</th>
              <th>Total</th>
              <th>%</th>
            </tr>
          </thead>

          {CategoriasInsumos.map((objCategoria) => {
            const insumosList = sumatoriaInsumos(
              setInsumosByCategory(projectInsumos, objCategoria.name)
            );
            let costoCategoria: number;
            if (insumosList.length > 0) {
              costoCategoria = costoFinalCategoria(insumosList);
            } else {
              costoCategoria = 0;
            }

            return (
              <tbody key={objCategoria.name}>
                <tr className="insumoTitle">
                  <th>{objCategoria.name}</th>
                  <th> </th>
                  <th> </th>
                  <th> </th>
                  <th> </th>
                  <th>{setFormat(costoCategoria)} </th>
                  <th>{insumosList.length > 0 ? " 100 %" : ""}</th>
                </tr>
                {insumosList.length > 0
                  ? insumosList.map((insumo) => {
                      return (
                        <tr key={insumo.id}>
                          <td>{insumo.clave}</td>
                          <td>{insumo.descripcion}</td>
                          <td>{insumo.unidad}</td>
                          <td>{setFormat(insumo.precio)}</td>
                          <td>{insumo.cantidadTotal.toFixed(2)}</td>
                          <td>{setFormat(costoFinalInsumo(insumo))}</td>
                          <td>
                            {(
                              (costoFinalInsumo(insumo) / costoCategoria) *
                              100
                            ).toFixed(2)}
                            %
                          </td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            );
          })}
        </table>
      </div>
    </section>
  );
}
