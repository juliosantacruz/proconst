import React from "react";

import logoProConst from '../../assets/LogoProConst/Logo_proConst_350x130.png'
import "./Navbar.scss";
import DropDown from "../../components/DropDown";

export default function Navbar() {
  return (
    <header>
      <nav>
        <div className="logo">
          <img src={logoProConst} alt="logo" />
        </div>

        <div className="user">
          <DropDown/>
          {/* <div className="userIcon">JS</div> */}
        </div>
      </nav>
    </header>
  );
}
