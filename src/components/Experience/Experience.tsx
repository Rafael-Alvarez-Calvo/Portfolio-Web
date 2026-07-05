import { useLang } from "../../contexts/LanguageContext";
import { useReveal } from "../../hooks/useReveal";
import { COMPANY_LOGO_BY_KEY, COMPANY_LOGO_KEYS } from "./Experience.constants";
import type { TimelineItemProps } from "./index";

const TimelineItem = ({ job, index: jobIndex, currentLabel }: TimelineItemProps) => {
  const { ref, visible } = useReveal<HTMLDivElement>(0.1);
  const CompanyLogo = COMPANY_LOGO_BY_KEY[COMPANY_LOGO_KEYS[jobIndex]];

  return (
    <div
      ref={ref}
      className={`timeline-item ${visible ? "visible" : ""} relative flex gap-8`}
      style={{ transitionDelay: `${jobIndex * 0.08}s` }}
    >
      {/* Line + dot */}
      <div
        className="relative flex flex-col items-center flex-shrink-0"
        style={{ width: "20px" }}
      >
        <div
          className="relative z-10 rounded-full flex-shrink-0"
          style={{
            width: "14px",
            height: "14px",
            marginTop: "4px",
            background: job.current ? "#06b6d4" : "#3b82f6",
            boxShadow: job.current
              ? "0 0 0 3px rgba(6,182,212,0.2),0 0 16px rgba(6,182,212,0.5)"
              : "0 0 0 3px rgba(59,130,246,0.15),0 0 10px rgba(59,130,246,0.3)",
            border: "2px solid var(--bg2)",
          }}
        />
        <div
          className="flex-1 w-px mt-2"
          style={{
            background:
              "linear-gradient(to bottom, rgba(59,130,246,0.5), rgba(59,130,246,0.05))",
            minHeight: "32px",
          }}
        />
      </div>

      {/* Content */}
      <div className="pb-10 flex-1 min-w-0">
        {/* Logo */}
        {CompanyLogo && (
          <div className="h-8 flex items-center mb-3">
            <CompanyLogo className="h-7 max-w-[130px]" />
          </div>
        )}

        <div className="font-mono text-[0.75rem] text-[var(--text-dim)] mb-1">
          {job.date}
        </div>
        <div
          className="text-sm font-semibold mb-1"
          style={{ color: job.current ? "#06b6d4" : "#3b82f6" }}
        >
          {job.company}
        </div>
        <div className="font-syne text-[1.1rem] font-bold mb-2">{job.role}</div>

        {job.current && (
          <span className="inline-flex items-center gap-1.5 bg-[rgba(6,182,212,0.08)] border border-[rgba(6,182,212,0.25)] rounded-full px-2.5 py-0.5 font-mono text-[0.68rem] text-cyan mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
            {currentLabel}
          </span>
        )}

        <p className="text-[var(--text-muted)] text-[0.88rem] leading-[1.65] mb-3">
          {job.desc}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {job.tech.map((technology) => (
            <span
              key={technology}
              className="bg-[rgba(59,130,246,0.07)] border border-[rgba(59,130,246,0.18)] rounded px-2 py-0.5 font-mono text-[0.72rem] text-[var(--text-muted)]"
            >
              {technology}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Experience = () => {
  const { translations } = useLang();
  const header = useReveal();

  return (
    <section id="experience" className="py-24 px-6 bg-[var(--bg2)]">
      <div className="max-w-6xl mx-auto">
        <div ref={header.ref} className={`reveal ${header.visible ? "visible" : ""}`}>
          <div className="font-mono text-[0.78rem] text-cyan uppercase tracking-[0.15em] mb-3">
            {translations.experience.tag}
          </div>
          <h2 className="font-syne text-[clamp(1.9rem,4vw,2.7rem)] font-extrabold leading-[1.15] mb-12">
            {translations.experience.title}
            <br />
            <span className="grad">{translations.experience.titleGrad}</span>
          </h2>
        </div>
        <div className="flex flex-col">
          {translations.experience.jobs.map((job, jobIndex) => (
            <TimelineItem
              key={job.company + job.date}
              job={job}
              index={jobIndex}
              currentLabel={translations.experience.current}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
