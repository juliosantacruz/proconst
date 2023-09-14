import React, { useEffect, useRef, useState } from "react";
import "./DropDown.scss";
import user from "../../assets/icons/bx-user-circle.svg";
import logout from "../../assets/icons/bx-log-out.svg";
import { useAuthStore } from "../../store/authStore";


export default function DropDown() {
  const [open, setOpen] = useState(false);
  const {profile} = useAuthStore()
  const menuRef = useRef();

  useEffect(() => {
    const handler = (event: any) => {
      if (!(menuRef.current as any).contains(event.target)) {
        console.log(menuRef);
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", (event) => handler(event));
  }, []);

  console.log(menuRef);
  return (
    <div className="menuContainer " ref={menuRef as any}>
      <div className="menuTrigger" onClick={() => setOpen(!open)}>
        <div className="userIcon">JS</div>
      </div>

      <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
        <div className="dropdownIcon">

        <img src={user} alt="" />
        </div>
        <h3>
          {(profile as any).name} <br /> <span>{(profile as any).email}</span>
        </h3>
        <ul>
          <LogOut />
          <DropDownItem />
        </ul>
      </div>
    </div>
  );
}

 
import { useNavigate } from "react-router-dom";
import { RoutesDirectory } from "../../routes/router";

function LogOut() {
  const navigate = useNavigate();
  const { setLogout } = useAuthStore();

  const LogOut = () => {
    setLogout();
    navigate(RoutesDirectory.LOG_IN);
  };

  return (
    <li className="dropdownItem noBtn">
      <img src={logout} alt="icon" />
      <button type="button" onClick={LogOut}>
        Cerrar Session
      </button>
    </li>
  );
}

function DropDownItem() {
  return (
    <li className="dropdownItem">
      <img src={user} alt="icon" />
      <a href="">link</a>
    </li>
  );
}
