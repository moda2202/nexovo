// src/components/certificates/CertificateModal.tsx
import { useEffect } from "react";
import type { Certificate } from "../../types/cv";

interface CertificateModalProps {
  certificate: Certificate | null;
  onClose: () => void;
}

export function CertificateModal({
  certificate,
  onClose,
}: CertificateModalProps) {
  useEffect(() => {
    if (!certificate) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <div className="modal-title">{certificate.name}</div>
            <div className="muted">
              {certificate.issuer} • {certificate.status}
              {certificate.period ? ` • ${certificate.period}` : ""}
            </div>
          </div>
          <button className="btn" onClick={onClose}>
            Close (Esc)
          </button>
        </div>

        <div className="divider" />

        <div className="modal-body">
          <div className="subhead">What to add next</div>
          <ul className="list">
            <li>Upload certificate PDF/image in the repo</li>
            <li>Add a short description of what you learned</li>
            <li>Add related project link (if applicable)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
