import "./AsideModal.scss";
import { useUxStore } from "../../store/uxStore";
import AnyIcon from "../AnyIcon";
import closeIcon from "../../assets/icons/bx-x.svg";

export default function AsideModal({
  children,
  title,
  widthModal,
  clossable,
}: any) {
  const { openModal, setOpenModal } = useUxStore();

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
        {clossable && (
          <button className="closeIconBtn" onClick={() => setOpenModal(false)}>
            <AnyIcon iconSrc={closeIcon} iconWidth={30} iconHeight={30} />
          </button>
        )}
      </div>
      {children}
    </aside>
  );
}
