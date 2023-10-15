import React, { ReactNode } from "react";

import "./Navbar.scss";
import DropDown from "../../components/DropDown";


type Props = {
  children?: ReactNode;
};


export default function Navbar({ children }: Props) {
  return (
    <header>
      <nav>
        
        <div className="buttonGoup">
        {children}
        </div>
        <div className="user">
          <DropDown/>
          {/* <div className="userIcon">JS</div> */}
        </div>
      </nav>
    </header>
  );
}
