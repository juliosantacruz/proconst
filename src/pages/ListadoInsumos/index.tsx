import { lazy, Suspense } from "react";
import { useUxStore } from "../../store/uxStore";
import PageTitle from "../../components/PageTitle";
import AddButton from "../../components/AddButton";
import FormInsumo from "../../components/FormInsumo";
import AsideModal from "../../components/AsideModal";
// import TableTabsListInsumo from "../../components/TableTabsListInsumo";
import "./ListadoInsumos.scss";
import AnyIcon from "../../components/AnyIcon";
import { Insumo } from "../../types/Insumo";
import { createJSONFileInsumos } from "../../utils/ProjectFunctions";
import downloadIcon from "../../assets/icons/bx-download.svg";
import uploadIcon from "../../assets/icons/bx-upload.svg";

import { useInsumoStore } from "../../store/projectStore";
import FormLoad from "../../components/FormLoad";

const TableTabsListInsumo = lazy(
  () => import("../../components/TableTabsListInsumo")
);

export default function ListadoInsumos() {
  const { modalFormInsumo, openModalFormInsumo, modalFormLoad, openModalFormLoad } = useUxStore();
  const { insumos } = useInsumoStore();

  const handleAddInsumo = () => {
    console.log("Inicio");
    openModalFormInsumo(true);
    console.log("fin");
  };

  const handleExportInsumo = (arrInsumos: Insumo[]) => {
    createJSONFileInsumos(arrInsumos);
  };

  const handleImportInsumo = ()=>{
    openModalFormLoad(!modalFormLoad)
    console.log('cargar :D')
  }

  return (
    <section className="workspace">
      <PageTitle title="Mis Insumos">
        <button type="button" onClick={() => handleExportInsumo(insumos)}>
          <AnyIcon iconSrc={downloadIcon} footer="Descarga" />
        </button>

        <button type="button" onClick={() => handleImportInsumo()}>
          <AnyIcon iconSrc={uploadIcon} footer="Cargar" />
        </button>

        <AddButton
          onClick={handleAddInsumo}
          bgColor="rgb(31, 57, 204)"
          fontColor={"rgb(255, 255, 255)"}
        >
          + Insumo
        </AddButton>
      </PageTitle>
      <div className="btn-header"></div>

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
      {modalFormLoad && (
        <AsideModal
          widthModal={"40vw"}
          title="Agregar Insumo"
          clossable={true}
          openModal={modalFormLoad}
          setOpenModal={openModalFormLoad}
        >
          <FormLoad />
        </AsideModal>
      )}
    </section>
  );
}
