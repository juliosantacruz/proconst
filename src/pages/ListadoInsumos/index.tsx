import { useUxStore } from "../../store/uxStore";
import PageTitle from "../../components/PageTitle";
import AddButton from "../../components/AddButton"; 
import FormInsumo from "../../components/FormInsumo"; 
import AsideModal from "../../components/AsideModal";
import TableTabsListInsumo from "../../components/TableTabsListInsumo";
import "./ListadoInsumos.scss";
import TableListInsumo from "../../components/TableListInsumo";

export default function ListadoInsumos() {
  const { openModal, setOpenModal } = useUxStore();

  const handleAddInsumo = () => {
    console.log("Inicio");
    setOpenModal(true);
    console.log("fin");
  };

  return (
    <section className="workspace">
      <PageTitle>Mis Insumos</PageTitle>
      <div className="btn-header">
        <AddButton
          onClick={handleAddInsumo}
          bgColor="rgb(31, 57, 204)"
          fontColor={"rgb(255, 255, 255)"}
        >
          Agregar Insumo
        </AddButton>
      </div>

      <div className="insumosGroup">
        <TableTabsListInsumo />
      </div>
      {openModal && (
        <AsideModal widthModal={"40vw"} title="Agregar Insumo">
          <FormInsumo/>
        </AsideModal>
      )}
    </section>
  );
}
