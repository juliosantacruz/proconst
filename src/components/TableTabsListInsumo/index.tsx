import { Tabs } from "antd";
import { useInsumoStore } from "../../store/projectStore";
import { Insumo } from "../../types/Insumo"; 
import TableListInsumo from "../TableListInsumo";

export default function TableTabsInsumo() {

  const { insumos } = useInsumoStore();

  const insumoFilter = (arr: Insumo[], categoria: string) => {
    return arr.filter((element) => element.categoria === categoria);
  };
  const TodosInsumos = insumos;
  const MaterialInsumos = insumoFilter(insumos, "Materiales");
  const ManoObraInsumos = insumoFilter(insumos, "Mano de Obra");
  const HerramientaInsumos = insumoFilter(insumos, "Herramienta");
  const EquipoInsumos = insumoFilter(insumos, "Equipo");
  const SubContratoInsumos = insumoFilter(insumos, "Subcontrato");

  const onChange = (key: string) => {
    console.log(key);
  };

  const InsumosTabs = [
    {
      label: `Todos`,
      key: "1",
      children: <TableListInsumo insumosData={TodosInsumos} />,
    },
    {
      label: `Materiales`,
      key: "2",
      children: <TableListInsumo insumosData={MaterialInsumos} />,
    },
    {
      label: `Mano de Obra`,
      key: "3",
      children: <TableListInsumo insumosData={ManoObraInsumos} />,
    },
    {
      label: `Herramienta`,
      key: "4",
      children: <TableListInsumo insumosData={HerramientaInsumos} />,
    },
    {
      label: `Equipos`,
      key: "5",
      children: <TableListInsumo insumosData={EquipoInsumos} />,
    },
    {
      label: `SubContratos`,
      key: "6",
      children: <TableListInsumo insumosData={SubContratoInsumos} />,
    },
  ];

  return <Tabs onChange={onChange} type="card" items={InsumosTabs} />;
}
