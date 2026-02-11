// src/components/sections/SkillsSection.tsx
import type { Cv } from "../../types/cv";

interface SkillsSectionProps {
  cv: Cv;
}

export function SkillsSection({ cv }: SkillsSectionProps) {
  const it = cv.itCompetences;

  return (
    <section id="skills" className="card glass">
      <div className="section-head">
        <div>
          <div className="h2">Skills</div>
          <div className="muted">Technologies & tools</div>
        </div>
      </div>

      <div className="cols">
        <div className="col">
          <div className="subhead">Languages & Frameworks</div>
          <div className="badges">
            {it?.languagesAndFrameworks?.map((s) => (
              <span className="badge" key={s}>
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="col">
          <div className="subhead">Databases</div>
          <div className="badges">
            {it?.databases?.map((s) => (
              <span className="badge" key={s}>
                {s}
              </span>
            ))}
          </div>

          <div className="subhead" style={{ marginTop: 14 }}>
            Tools & Platforms
          </div>
          <div className="badges">
            {it?.toolsAndPlatforms?.map((s) => (
              <span className="badge" key={s}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
