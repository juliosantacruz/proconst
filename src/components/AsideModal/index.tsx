import "./AsideModal.scss";
import AnyIcon from "../AnyIcon";
import closeIcon from "../../assets/icons/bx-x.svg";
import { ReactNode } from "react";

type AsideProps = {
  children:ReactNode;
  widthModal: string;
  title: string;
  clossable: boolean;
  openModal: boolean;
  setOpenModal: (value:boolean) => void;
  modalType?: string;
};

export default function AsideModal(Props: AsideProps) {
  const {
    children,
    title,
    widthModal,
    clossable,
    openModal,
    setOpenModal,
    modalType,
  } = Props;

  

 

  const ColorType=[
    {type:'Insumo', bgColor:'#b7987e50'},
    {type:'Concepto', bgColor:'#adb77e29'},
    {type:'Partida', bgColor:'#7eb79150'},
    {type:'Presupuesto', bgColor:'#0c899250'},
    {type:'Load', bgColor:'#7e87b750'},
    {type:'Other', bgColor:'#b57eb750'},
  ]

  const bgColor = ColorType.find((element)=>element.type===modalType)?.bgColor
  console.log(bgColor)
  const classModal = () => {
    if (openModal) {
      return `asideModal spread`;
    } else {
      return `asideModal`;
    }
  };

  return (
    <aside
      className={classModal()}
      style={{ width: widthModal, backgroundColor:bgColor }}
     
    >
      <div className="header" >
        <h3 >{title}</h3>
        {clossable && (
          <button className="closeIconBtn" onClick={() => setOpenModal(false)}>
            <AnyIcon iconSrc={closeIcon} iconWidth={30} iconHeight={30} />
          </button>
        )}
      </div>
      <div className="body">

      {children}
      </div>
    </aside>
  );
}
