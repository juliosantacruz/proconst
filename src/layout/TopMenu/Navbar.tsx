import React from "react";

import "./Navbar.scss";
import DropDown from "../../components/DropDown";

export default function Navbar() {
  return (
    <header>
      <nav>
        

        <div className="user">
          <DropDown/>
          {/* <div className="userIcon">JS</div> */}
        </div>
      </nav>
    </header>
  );
}
