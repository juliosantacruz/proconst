import { Tabs } from "antd";
import { useInsumoStore } from "../../store/projectStore";
import { Insumo } from "../../types/Insumo"; 
// import TableListInsumo from "../TableListInsumo";
import TableInsumo from "../TableInsumo";


export default function TableTabsInsumo() {

  const { insumos } = useInsumoStore();

  const insumoFilter = (arr: Insumo[], categoria: string) => {
    return arr.filter((element) => element.categoria === categoria);
  };
  const TodosInsumos = insumos.sort((a,b)=>  a.clave.localeCompare(b.clave));
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
      children: <TableInsumo insumosData={TodosInsumos} />,
    },
    {
      label: `Materiales`,
      key: "2",
      children: <TableInsumo insumosData={MaterialInsumos} />,
    },
    {
      label: `Mano de Obra`,
      key: "3",
      children: <TableInsumo insumosData={ManoObraInsumos} />,
    },
    {
      label: `Herramienta`,
      key: "4",
      children: <TableInsumo insumosData={HerramientaInsumos} />,
    },
    {
      label: `Equipos`,
      key: "5",
      children: <TableInsumo insumosData={EquipoInsumos} />,
    },
    {
      label: `SubContratos`,
      key: "6",
      children: <TableInsumo insumosData={SubContratoInsumos} />,
    },
  ];

  return <Tabs onChange={onChange} type="card" items={InsumosTabs} />;
}
