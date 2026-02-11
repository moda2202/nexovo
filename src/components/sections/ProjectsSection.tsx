// src/components/sections/ProjectsSection.tsx
import type { Cv } from "../../types/cv";

interface ProjectsSectionProps {
  cv: Cv;
}

export function ProjectsSection({ cv }: ProjectsSectionProps) {
  return (
    <section id="projects" className="card glass">
      <div className="section-head">
        <div>
          <div className="h2">Projects</div>
          <div className="muted">Highlights</div>
        </div>
      </div>

      <div className="grid">
        {cv.projects?.map((p) => (
          <div key={p.name} className="tile static">
            <div className="tile-title">{p.name}</div>
            <div className="p muted">{p.description}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
