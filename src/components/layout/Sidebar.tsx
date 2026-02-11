// src/components/layout/Sidebar.tsx
import type { Cv } from "../../types/cv";
import { API_BASE } from "../../config";
import { badgeText } from "../../utils/badgeText";

interface SidebarProps {
  cv: Cv;
  copied: boolean;
  onCopyEmail: (email: string) => void;
}

export function Sidebar({ cv, copied, onCopyEmail }: SidebarProps) {
  const links = cv.profile.links ?? {};

  return (
    <aside className="sidebar">
      <section className="card glass hero">
        <div className="hero-name">{cv.profile.fullName}</div>
        <div className="hero-title">{cv.profile.title}</div>

        {cv.profile.avatarUrl && (
          <img
            className="hero-avatar"
            src={`${API_BASE}${cv.profile.avatarUrl}`}
            alt="Profile photo"
            loading="lazy"
          />
        )}

        <div className="hero-meta">
          <span>{cv.profile.location}</span>
          <span>•</span>
          <a href={`mailto:${cv.profile.email}`}>{cv.profile.email}</a>
        </div>

        <div className="hero-actions">
          {links.github && (
            <a className="btn" href={links.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          )}
          {links.linkedin && (
            <a className="btn" href={links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          )}
          <button
            className="btn ghost"
            onClick={() => onCopyEmail(cv.profile.email)}
            title="Copy email"
          >
            {copied ? "Copied ✅" : "Copy Email"}
          </button>
          <button
            className="btn ghost"
            onClick={() => window.print()}
            title="Save as PDF"
          >
            Download PDF
          </button>
        </div>

        <div className="divider" />

        <div className="info-grid">
          <div className="info">
            <div className="label">Phone</div>
            <div className="value">
              <a href={`tel:${cv.profile.phone}`}>{cv.profile.phone}</a>
            </div>
          </div>
          <div className="info">
            <div className="label">GitHub</div>
            <div className="value">@{cv.profile.githubUsername}</div>
          </div>
          <div className="info">
            <div className="label">Driving License</div>
            <div className="value">
              {cv.drivingLicense?.typeB ? "B" : "-"}
              {cv.drivingLicense?.truckCard ? " • Truck card" : ""}
            </div>
          </div>
        </div>
      </section>

      <section className="card glass">
        <div className="section-title">Languages</div>
        <div className="badges">
          {cv.languages?.map((l) => (
            <span key={l.name} className="badge">
              {badgeText(l.name)}
              <span className="badge-muted"> • {badgeText(l.level)}</span>
            </span>
          ))}
        </div>
      </section>

      <section className="card glass">
        <div className="section-title">Interests</div>
        <div className="badges">
          {cv.interests?.map((i) => (
            <span key={i} className="badge">
              {badgeText(i)}
            </span>
          ))}
        </div>
      </section>
    </aside>
  );
}
