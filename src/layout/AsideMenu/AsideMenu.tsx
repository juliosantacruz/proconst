import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { RoutesDirectory } from "../../routes/router";
import "./AsideMenu.scss";
import { useWorkingPresupuesto } from "../../store/projectStore";
import logoProConst from "../../assets/newLogo.svg";
import logoJS from "../../assets/JS Icon.svg";

export default function AsideMenu() {
  const { id, nombreProyecto, emptyWorkingPresupuesto } =
    useWorkingPresupuesto();
  const navigate = useNavigate();

  const closeProject = () => {
    emptyWorkingPresupuesto();
    navigate(RoutesDirectory.HOME);
  };

  return (
    <aside id="sideMenu" className="sideMenu">
      <nav>
        <div className="logoProconst">
          <img src={logoProConst} alt="logo" />
        </div>
        <ul>
          {/* Menu general */}
          <li>
            <NavLink to={RoutesDirectory.HOME}>Inicio</NavLink>
          </li>
          <li>
            <NavLink to={RoutesDirectory.LISTADO_CONCEPTOS}>
              Listado de Conceptos
            </NavLink>
          </li>
          <li>
            <NavLink to={RoutesDirectory.LISTADO_INSUMOS}>
              Listado de Insumos
            </NavLink>
          </li>
          <hr className="separator"/>
          {/* Menu de presupuesto */}

          {id ? (
            <>
              <p>
                <span className="subtitle">Trabajando en</span> <br />{" "}
                <span className="projectName">{nombreProyecto}</span>
              </p>
              <li>
                <NavLink to={RoutesDirectory.GO_WORKING_PRESUPUESTO(id)}>
                  Presupuesto de Obra
                </NavLink>
              </li>
              <li>
                <NavLink to={RoutesDirectory.GO_EXPLOSION_INSUMOS(id)}>
                  Explosion de insumos
                </NavLink>
              </li>
              <li>
                <NavLink to={RoutesDirectory.GO_CATALOGO_INSUMOS(id)}>
                  Catalogo de Insumos
                </NavLink>
              </li>
              <li>
                <NavLink to={RoutesDirectory.GO_CATALOGO_CONCEPTOS(id)}>
                  Catalogo de Conceptos
                </NavLink>
              </li>
              <li>Analisis de Precios Unitarios</li>
              {/* <button className="btnCerrar" onClick={emptyWorkingPresupuesto}>Cerrar Presupuesto</button> */}
            </>
          ) : null}
        </ul>
        {id && (
          <div className="bottonNav">
            <button className="btnCerrar" onClick={closeProject}>
              Cerrar Presupuesto
            </button>
          </div>
        )}
      </nav>
          <a href="https://www.juliosantacruz.dev" target="_blank">
        <div className="logoJS">
          <img src={logoJS} alt="logo" />

        </div>
          </a>
    </aside>
  );
}
