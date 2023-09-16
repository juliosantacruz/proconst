import "./AsideModal.scss";
import { useUxStore } from "../../store/uxStore";
import AnyIcon from "../AnyIcon";
import closeIcon from "../../assets/icons/bx-x.svg";
import { useEffect, useRef } from "react";

export default function AsideModal(Props: any) {
  const { children, title, widthModal, clossable, openModal, setOpenModal } =
    Props;

  const modalRef = useRef();
  
  // useEffect(() => {
  //   const handler = (event: any) => {
  //     if (!(modalRef.current as any).contains(event.target)) {
  //       // console.log(modalRef);
  //       setOpenModal(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", (event) => handler(event));
  // }, []);

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
      style={{ width: widthModal }}
      ref={modalRef as any}
    >
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
