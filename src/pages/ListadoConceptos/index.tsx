import PageTitle from "../../components/PageTitle";
import AddButton from "../../components/AddButton";
import { Concepto, ListadoInsumos } from "../../types/Concepto";
import { useConceptoStore, useInsumoStore } from "../../store/projectStore";

import "./ListadoConceptos.scss";
import AsideModal from "../../components/AsideModal";
import FormConcepto from "../../components/FormConcepto";

import AnyIcon from "../../components/AnyIcon";
import { setFormat } from "../../utils/CurrencyFormat";
import { useUxStore } from "../../store/uxStore";
import { Insumo } from "../../types/Insumo";
import TableConcepto from "../../components/TableConcepto";

export default function ListadoConceptos() {
  const { modalFormConcepto, openModalFormConcepto } = useUxStore();
  const { insumos } = useInsumoStore();
  const { conceptos, setConceptoToUpdate, deleteConcepto } = useConceptoStore();

  // Mandar a utils
  const insumoData = (arrIsumos: Insumo[], findInsumo: ListadoInsumos) =>
    arrIsumos.find((element) => element.id === findInsumo.insumoId);

  const handleAddConcepto = () => {
    console.log("Inicio");
    openModalFormConcepto(true);
    console.log("fin");
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
      <div className="btn-header"></div>

      <TableConcepto/>

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
