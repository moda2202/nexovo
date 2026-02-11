// src/components/sections/EducationSection.tsx
import type { Cv } from "../../types/cv";

interface EducationSectionProps {
  cv: Cv;
}

export function EducationSection({ cv }: EducationSectionProps) {
  return (
    <section id="education" className="card glass">
      <div className="section-head">
        <div>
          <div className="h2">Education</div>
          <div className="muted">Programs & highlights</div>
        </div>
      </div>

      <div className="timeline">
        {cv.education?.map((e) => (
          <div key={e.program} className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-body">
              <div className="row">
                <div className="strong">{e.program}</div>
                <div className="muted small">{e.period}</div>
              </div>
              <div className="muted">
                {e.school} • {e.location}
              </div>
              <ul className="list">
                {e.highlights?.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
