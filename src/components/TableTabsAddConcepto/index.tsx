import { Tabs } from "antd";
import { useInsumoStore } from "../../store/projectStore";
import { Insumo } from "../../types/Insumo";
import TableInsumoAddConcepto from "../TableInsumoAddConcepto";

export default function TableTabsAddConcepto( {data, addInputInsumo}:any) {
   
  const { insumos } = useInsumoStore();

  const insumoFilter = (arr: Insumo[], categoria: string) => {
    return arr.filter((element) => element.categoria === categoria);
  };
  const TodosInsumos = data;
  const MaterialInsumos = insumoFilter(data, "Materiales");
  const ManoObraInsumos = insumoFilter(data, "Mano de Obra");
  const HerramientaInsumos = insumoFilter(data, "Herramienta");
  const EquipoInsumos = insumoFilter(data, "Equipo");
  const SubContratoInsumos = insumoFilter(data, "Subcontrato");
   
  const onChange = (key: string) => {
    console.log(key);
  };

  const InsumosTabs = [
    {
      label: `Todos`,
      key: "1",
      children: <TableInsumoAddConcepto insumosData={TodosInsumos} addInputInsumo={addInputInsumo} />,
    },
    {
      label: `Materiales`,
      key: "2",
      children: <TableInsumoAddConcepto insumosData={MaterialInsumos} addInputInsumo={addInputInsumo} />,
    },
    {
      label: `Mano de Obra`,
      key: "3",
      children: <TableInsumoAddConcepto insumosData={ManoObraInsumos} addInputInsumo={addInputInsumo} />,
    },
    {
      label: `Herramienta`,
      key: "4",
      children: <TableInsumoAddConcepto insumosData={HerramientaInsumos} addInputInsumo={addInputInsumo} />,
    },
    {
      label: `Equipos`,
      key: "5",
      children: <TableInsumoAddConcepto insumosData={EquipoInsumos} addInputInsumo={addInputInsumo} />,
    },
    {
      label: `SubContratos`,
      key: "6",
      children: <TableInsumoAddConcepto insumosData={SubContratoInsumos} addInputInsumo={addInputInsumo} />,
    },
  ];

  return <Tabs onChange={onChange} type="card" items={InsumosTabs} />;
}
