// src/components/sections/SummarySection.tsx
interface SummarySectionProps {
  text: string;
}

export function SummarySection({ text }: SummarySectionProps) {
  return (
    <section id="summary" className="card glass">
      <div className="section-head">
        <div>
          <div className="h2">Summary</div>
          <div className="muted">Short professional overview</div>
        </div>
      </div>
      <p className="p">{text}</p>
    </section>
  );
}
