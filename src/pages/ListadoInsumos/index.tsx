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
import { createJSONFileInsumos } from "../../utils/ExportFunctions";
import downloadIcon from "../../assets/icons/bx-download.svg";
import uploadIcon from "../../assets/icons/bx-upload.svg";

import { useInsumoStore } from "../../store/projectStore";
import FormLoad from "../../components/FormLoad";
import TableInsumo from "../../components/TableInsumo";
import FormTareas from "../../components/FormTareas";
import Navbar from "../../layout/TopMenu/Navbar";

const TableTabsListInsumo = lazy(
  () => import("../../components/TableTabsListInsumo")
);

export default function ListadoInsumos() {
  const {
    modalFormInsumo,
    openModalFormInsumo,
    modalFormLoad,
    openModalFormLoad,
    modalFormTarea,
    openModalFormTarea,
  } = useUxStore();

  const { insumos } = useInsumoStore();

  const handleAddInsumo = () => {
    console.log("Inicio");
    openModalFormInsumo(true);
    console.log("fin");
  };

  const handleExportInsumo = (arrInsumos: Insumo[]) => {
    // createJSONFileInsumos(arrInsumos);
    const promise = createJSONFileInsumos(arrInsumos);

    promise.then(() => {
      console.log('El archivo JSON se ha creado correctamente.')
    });

    promise.catch((err) => {
      console.log(' Se ha producido un error al crear el archivo JSON.', err)

      //
    });
  };

  const handleImportInsumo = () => {
    openModalFormLoad(!modalFormLoad);
    console.log("cargar :D");
  };

  return (
    <section className="workspace listadoInsumosPage">
      <Navbar>
        <AddButton onClick={() => handleExportInsumo(insumos)}>
          <AnyIcon iconSrc={downloadIcon} />
          Descargar
        </AddButton>

        <AddButton onClick={() => handleImportInsumo()}>
          <AnyIcon iconSrc={uploadIcon} />
          Cargar
        </AddButton>

        <AddButton
          onClick={handleAddInsumo}
          bgColor="rgb(31, 57, 204)"
          fontColor={"rgb(255, 255, 255)"}
        >
          + Insumo
        </AddButton>
        
      </Navbar>
     

      <div className="insumosGroup">
        <Suspense fallback={<div> loading </div>}>
        <TableInsumo insumosData={insumos} />
        </Suspense>
      </div>
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
       {modalFormTarea && (
        <AsideModal
          widthModal={"70vw"}
          clossable={false}
          title="Agregar Tarea"
          openModal={modalFormTarea}
          setOpenModal={openModalFormTarea}
          modalType={'Insumo'}
        >
          <FormTareas   />
        </AsideModal>
      )}
      {modalFormLoad && (
        <AsideModal
          widthModal={"40vw"}
          title=" "
          clossable={true}
          openModal={modalFormLoad}
          setOpenModal={openModalFormLoad}
          modalType={'Load'}
        >
          <FormLoad />
        </AsideModal>
      )}
    </section>
  );
}
