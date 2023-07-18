import React, { useState } from "react";
import AnyIcon from "../AnyIcon";

import "./AsideModal.scss";
import closeIcon from "../../assets/icons/bx-x.svg";
import { useUxStore } from "../../store/uxStore";

export default function AsideModal({ children, title, widthModal }: any) {
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
        {/* <button className='closeIconBtn' onClick={()=>setOpenModal(false)}>
                <AnyIcon iconSrc={closeIcon} iconWidth={30} iconHeight={30}/>
            </button> */}
      </div>
      {children}
    </aside>
  );
}
