import "./AsideModal.scss";
import { useUxStore } from "../../store/uxStore";

export default function AsideModal({ children, title, widthModal }: any) {
  const { openModal } = useUxStore();

  const classModal = () => {
    if (openModal) {
      return `asideModal spread`;
    } else {
      return `asideModal`;
    }
  };

  return (
    <aside className={classModal()} style={{ width: widthModal }}>
      <div className="header">
        <h3>{title}</h3>
        {/* <button className='closeIconBtn' onClick={()=>setOpenModal(false)}>
                <AnyIcon iconSrc={closeIcon} iconWidth={30} iconHeight={30}/>
            </button> */}
      </div>
      {children}
    </aside>
  );
}
