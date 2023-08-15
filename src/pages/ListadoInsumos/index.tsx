import { lazy, Suspense } from "react";
import { useUxStore } from "../../store/uxStore";
import PageTitle from "../../components/PageTitle";
import AddButton from "../../components/AddButton";
import FormInsumo from "../../components/FormInsumo";
import AsideModal from "../../components/AsideModal";
// import TableTabsListInsumo from "../../components/TableTabsListInsumo";
import "./ListadoInsumos.scss";

const TableTabsListInsumo = lazy(
  () => import("../../components/TableTabsListInsumo")
);

export default function ListadoInsumos() {
  const { modalFormInsumo, openModalFormInsumo } = useUxStore();

  const handleAddInsumo = () => {
    console.log("Inicio");
    openModalFormInsumo(true);
    console.log("fin");
  };

  return (
    <section className="workspace">
      <PageTitle title="Mis Insumos">
        <AddButton
          onClick={handleAddInsumo}
          bgColor="rgb(31, 57, 204)"
          fontColor={"rgb(255, 255, 255)"}
        >
          Agregar Insumo
        </AddButton>
      </PageTitle>
      <div className="btn-header">
        
      </div>

      <div className="insumosGroup">
        <Suspense fallback={<div> loading </div>}>
          <TableTabsListInsumo />
        </Suspense>
      </div>
      {modalFormInsumo && (
        <AsideModal
          widthModal={"40vw"}
          title="Agregar Insumo"
          clossable={false}
          openModal={modalFormInsumo}
          setOpenModal={openModalFormInsumo}
        >
          <FormInsumo />
        </AsideModal>
      )}
    </section>
  );
}
