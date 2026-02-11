// src/components/sections/CertificatesSection.tsx
import type { Certificate } from "../../types/cv";
import { API_BASE } from "../../config";

interface CertificatesSectionProps {
  certificates: Certificate[] | undefined;
  onSelect: (c: Certificate) => void;
}

export function CertificatesSection({
  certificates,
  onSelect,
}: CertificatesSectionProps) {
  return (
    <section id="certificates" className="card glass">
      <div className="section-head">
        <div>
          <div className="h2">Certificates</div>
          <div className="muted">Click to open details</div>
        </div>
      </div>

      <div className="grid">
        {certificates?.map((c) => (
          <button
            key={c.name}
            className="tile"
            onClick={() => onSelect(c)}
          >
            <div className="cert-header">
              {c.logoUrl && (
                <img
                  className="cert-logo"
                  src={`${API_BASE}${c.logoUrl}`}
                  alt={`${c.issuer} logo`}
                  loading="lazy"
                />
              )}
              <div className="tile-title">{c.name}</div>
            </div>

            <div className="tile-meta">
              {c.issuer} • {c.status}
              {c.period ? ` • ${c.period}` : ""}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
