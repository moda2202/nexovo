// src/hooks/useScrollSpy.ts
import { useEffect, useState } from "react";

export function useScrollSpy(initialId = "summary") {
  const [activeSection, setActiveSection] = useState(initialId);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[id]")
    );
    if (!sections.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
          )[0];

        if (best?.target?.id) setActiveSection(best.target.id);
      },
      { threshold: [0.2, 0.4, 0.6] }
    );

    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return activeSection;
}
