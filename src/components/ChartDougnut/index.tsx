import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { CategoriasInsumos } from "../../utils/SelectInputOptions";
import "./ChartDougnut.scss";
import {
  costoFinalCategoria,
  costoFinalInsumo,
  setInsumosByCategory,
  sumatoriaInsumos,
} from "../../utils/ExplosionInsumos";

export default function ChartDougnut({ arrInsumos }: any) {
  const chartLabels: string[] = [];
  const chartCostos: number[] = [];

  CategoriasInsumos.map((category) => {
    chartLabels.push(category.name);

    // const arrPrecios:number[] = []
    const insumosList = sumatoriaInsumos(
      setInsumosByCategory(arrInsumos, category.name)
    );
    if (insumosList.length > 0) {
      const costoCategoria = costoFinalCategoria(insumosList);
      
      chartCostos.push(costoCategoria)
    } else {
      const costoCategoria = 0;
      chartCostos.push(costoCategoria)

    }

    
  });

  console.log(chartLabels);

  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: "$ = ",
        data: chartCostos,
        backgroundColor: [
          "#caeb3684",
          "#63ffa984",
          "#63d3ff84",
          "#8563ff84",
          "#ff63e584",
          "#ff639f84",
        ],
        borderColor: [
          "#caeb36",
          "#63ffa9",
          "#63d3ff",
          "#8563ff",
          "#ff63e5",
          "#ff639f",
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div style={{ maxWidth: "600px", width: "95%", margin: "0 auto" }}>
      <Doughnut data={data}  />
    </div>
  );
}
