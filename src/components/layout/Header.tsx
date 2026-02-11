// src/components/layout/Header.tsx
import { useEffect, useMemo, useRef, useState } from "react";

type NavItem = { id: string; label: string };

interface HeaderProps {
  activeSection: string;
  onNavigate: (id: string) => void;
  onCommunityClick: () => void;
}

export function Header({
  activeSection,
  onNavigate,
  onCommunityClick,
}: HeaderProps) {
  const [navOpen, setNavOpen] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);

  const cvMenuRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  const navItems: NavItem[] = useMemo(
    () => [
      { id: "summary", label: "Summary" },
      { id: "skills", label: "Skills" },
      { id: "education", label: "Education" },
      { id: "experience", label: "Experience" },
      { id: "certificates", label: "Certificates" },
      { id: "projects", label: "Projects" },
    ],
    []
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCvOpen(false);
        setNavOpen(false);
      }
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (cvMenuRef.current && !cvMenuRef.current.contains(target)) {
        setCvOpen(false);
      }
      if (navRef.current && !navRef.current.contains(target)) {
        setNavOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, []);

  return (
    <header className="topbar">
      <div className="brand">
        <div className="logo">CV</div>
        <div>
          <div className="brand-title">Firas CV</div>
        </div>
      </div>

      <div className="nav-wrap" ref={navRef}>
        <button
          className="btn ghost menu-btn"
          onClick={() => setNavOpen((v) => !v)}
        >
          Menu
        </button>

        <nav className={`nav ${navOpen ? "open" : ""}`}>
          {/* CV dropdown */}
          <div className="nav-group" ref={cvMenuRef}>
            <button
              className="nav-btn"
              onClick={() => setCvOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={cvOpen}
            >
              CV <span style={{ opacity: 0.7 }}>▾</span>
            </button>

            <div className={`dropdown ${cvOpen ? "open" : ""}`} role="menu">
              {navItems.map((x) => (
                <a
                  key={x.id}
                  href={`#${x.id}`}
                  className={activeSection === x.id ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    setCvOpen(false);
                    setNavOpen(false);
                    onNavigate(x.id);
                  }}
                >
                  <span>{x.label}</span>
                  {activeSection === x.id ? (
                    <span className="badge-mini">●</span>
                  ) : null}
                </a>
              ))}
            </div>
          </div>

          <a
            className="nav-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setNavOpen(false);
              setCvOpen(false);
              onCommunityClick();
            }}
            title="Coming soon"
          >
            Community
          </a>
        </nav>
      </div>
    </header>
  );
}
