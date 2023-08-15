import PageTitle from "../../components/PageTitle";
import AddButton from "../../components/AddButton";
import { Concepto, PrecioUnitario } from "../../types/Concepto";
import { useConceptoStore, useInsumoStore } from "../../store/projectStore";
import editIcon from "../../assets/icons/bx-edit.svg";
import deleteIcon from "../../assets/icons/bx-trash.svg";
import "./ListadoConceptos.scss";
import AsideModal from "../../components/AsideModal";
import FormConcepto from "../../components/FormConcepto";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import AnyIcon from "../../components/AnyIcon";
import { setFormat } from "../../utils/CurrencyFormat";
import { useUxStore } from "../../store/uxStore";
import { Insumo } from "../../types/Insumo";

export default function ListadoConceptos() {
  const { modalFormConcepto, openModalFormConcepto } = useUxStore();
  const { insumos } = useInsumoStore();
  const { conceptos, setConceptoToUpdate, deleteConcepto } = useConceptoStore();

  // Mandar a utils
  const insumoData = (arrIsumos: Insumo[], findInsumo: PrecioUnitario) =>
    arrIsumos.find((element) => element.id === findInsumo.insumoId);

  const columns: ColumnsType<Concepto> = [
    { title: "Clave", dataIndex: "clave", key: "clave" },
    { title: "Descripcion", dataIndex: "descripcion", key: "descripcion" },
    { title: "Unidad", dataIndex: "unidad", key: "unidad" },
    {
      title: "Precio",
      render: (_, record) => {
        const arrPrecio: number[] = [];
        record.precioUnitario?.map((element) => {
          const insumo = insumoData(insumos, element);
          const precio = element.cantidad * (insumo as Insumo).precio;
          arrPrecio.push(precio);
        });
        const precioTotal = arrPrecio.reduce((a, b) => a + b, 0);
        return <p>{setFormat(precioTotal)}</p>;
      },
    },
    {
      title: "Opciones",
      render: (_, record) => {
        return (
          <>
            <a onClick={() => handleEdit(record)}>
              <AnyIcon
                className={"icon"}
                iconSrc={editIcon}
                iconWidth={14}
                iconHeight={14}
              />
            </a>{" "}
            |
            <a onClick={() => handleDelete(record.id)}>
              <AnyIcon iconSrc={deleteIcon} iconWidth={14} iconHeight={14} />
            </a>
          </>
        );
      },
    },
  ];

  const handleAddConcepto = () => {
    console.log("Inicio");
    openModalFormConcepto(true);
    console.log("fin");
  };
  const handleEdit = (element: Concepto) => {
    setConceptoToUpdate(element);
    openModalFormConcepto(true);
    console.log(`se editar ${element.id}`);
  };
  const handleDelete = (id: string) => {
    deleteConcepto(id);
  };

  return (
    <section className="workspace">
      <PageTitle title="Mis Conceptos">
        <AddButton
          onClick={handleAddConcepto}
          bgColor="rgb(31, 57, 204)"
          fontColor={"rgb(255, 255, 255)"}
        >
          Agregar Concepto
        </AddButton>
      </PageTitle>
      <div className="btn-header">
        
      </div>

      <Table
        columns={columns}
        dataSource={conceptos}
        rowKey={(record) => record.id}
        pagination={false}
      />
      {modalFormConcepto && (
        <AsideModal
          widthModal={"70vw"}
          clossable={false}
          title="Agregar Concepto"
          openModal={modalFormConcepto}
          setOpenModal={openModalFormConcepto}
        >
          <FormConcepto />
        </AsideModal>
      )}
    </section>
  );
}
