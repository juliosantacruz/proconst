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
import FormInsumo from "../../components/FormInsumo";
import plusIcon from '../../assets/icons/bx-plus.svg'



export default function ListadoConceptos() {
  const { modalFormInsumo,
    openModalFormInsumo, modalFormConcepto, openModalFormConcepto } = useUxStore();
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
          bgColor="rgb(187, 198, 255)"
          fontColor={"rgb(0, 0, 0)"}
        >
          + Concepto
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
          modalType={'Concepto'}

        >
          <FormConcepto />
        </AsideModal>
      )}
      {modalFormInsumo && (
        <AsideModal
          widthModal={"40vw"}
          title="Agregar Insumo"
          clossable={false}
          openModal={modalFormInsumo}
          setOpenModal={openModalFormInsumo}
          modalType={'Insumo'}

        >
          <FormInsumo />
        </AsideModal>
      )}
    </section>
  );
}
