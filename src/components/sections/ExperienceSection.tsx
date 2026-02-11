// src/components/sections/ExperienceSection.tsx
import type { Cv } from "../../types/cv";

interface ExperienceSectionProps {
  cv: Cv;
}

export function ExperienceSection({ cv }: ExperienceSectionProps) {
  return (
    <section id="experience" className="card glass">
      <div className="section-head">
        <div>
          <div className="h2">Experience</div>
          <div className="muted">Work history</div>
        </div>
      </div>

      <div className="timeline">
        {cv.workExperience?.map((w) => (
          <div key={w.title + w.company} className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-body">
              <div className="row">
                <div className="strong">{w.title}</div>
                <div className="muted small">{w.period}</div>
              </div>
              <div className="muted">
                {w.company} • {w.location}
              </div>
              <ul className="list">
                {w.bullets?.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
