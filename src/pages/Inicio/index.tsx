import React from "react";
import ProjectCard from "../../components/ProjectCard";

import './Inicio.scss'
import PageTitle from "../../components/PageTitle";

export default function Index() {
  return (
    <section className="workspace">
      <PageTitle>
        Mis Presupuestos
      </PageTitle>
      
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
