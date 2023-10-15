import AsideMenu from "./AsideMenu/AsideMenu";
import Navbar from "./TopMenu/Navbar";
import Footer from "./Footer/Footer";
import "./MainLayout.scss";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { RoutesDirectory } from "../routes/router";

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }: Props) {
  const location = useLocation();
  // console.log('location' , location.pathname.slice(0,8))

  if (
    location.pathname === RoutesDirectory.LOG_IN ||
    location.pathname === RoutesDirectory.SIGN_IN ||
    location.pathname.slice(0, 7) === RoutesDirectory.VERIFY_USER.slice(0, 7)
  ) {
    return (
      <main id="proConst">
        {/* <Navbar/> */}

        {/* <AsideMenu/> */}
        {children}

        {/* <Footer/> */}
      </main>
    );
  } else {
    return (
      <div id="proConst">
        <AsideMenu />
        <main>
          {/* <Navbar /> */}
          {children}
        </main>
        {/* <Footer/> */}
      </div>
    );
  }
}
