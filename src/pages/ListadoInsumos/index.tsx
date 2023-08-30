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
import { createJSONFile, createJSONFileInsumos } from "../../utils/ProjectFunctions";
import exportIcon from "../../assets/icons/bx-export.svg";
import { useInsumoStore } from "../../store/projectStore";

const TableTabsListInsumo = lazy(
  () => import("../../components/TableTabsListInsumo")
);

export default function ListadoInsumos() {
  const { modalFormInsumo, openModalFormInsumo } = useUxStore();
  const { insumos } = useInsumoStore();

  

  const handleAddInsumo = () => {
    console.log("Inicio");
    openModalFormInsumo(true);
    console.log("fin");
  };

  const handleExportInsumo = (arrInsumos: Insumo[]) => {
    console.log(arrInsumos)
    createJSONFileInsumos(arrInsumos)
    console.log("se guarda", arrInsumos);
  };


  return (
    <section className="workspace">
      <PageTitle title="Mis Insumos">
      <button
          type="button"
          onClick={() => handleExportInsumo(insumos)}
        >
          <AnyIcon iconSrc={exportIcon} />
        </button>
        <AddButton
          onClick={handleAddInsumo}
          bgColor="rgb(31, 57, 204)"
          fontColor={"rgb(255, 255, 255)"}
        >
          + Insumo
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
