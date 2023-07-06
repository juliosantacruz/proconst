import React from "react";
import "./ProjectCard.scss";
export default function ProjectCard() {
  return (
    <article>
      <div className="header">
        <h4 className="titleCard">Casa Revolucion mat.</h4>
      </div>
      <div className="content">
        <p className="descriptionCard">
          Casa habitacion, 3 rec, 2 ba, 3 est, sala, cocina, comedor,
          lavanderia, estudio
        </p>
        <p className="dateCard">23/03/2022</p>
      </div>

      <div className="footer">
        <p className="amountCard">$3,430,200.00</p>
        <button>Abrir</button>
      </div>
    </article>
  );
}
