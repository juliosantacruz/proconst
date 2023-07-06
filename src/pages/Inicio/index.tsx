import React from "react";
import ProjectCard from "../../components/ProjectCard";

import './Inicio.scss'

export default function Index() {
  return (
    <section className="workspace">
      <div className="Title">
        <h2>Mis Presupuestos</h2>
      </div>
      <div className="Presupuestos">
      <ProjectCard/>
        <ProjectCard/>
        <ProjectCard/>
        <ProjectCard/><ProjectCard/>
        <ProjectCard/>
        <ProjectCard/>
        <ProjectCard/><ProjectCard/>
        <ProjectCard/>
        <ProjectCard/>
        <ProjectCard/>
      </div>
    </section>
  );
}
