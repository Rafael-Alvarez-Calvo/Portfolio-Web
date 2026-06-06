import { useEffect, useRef } from "react";
import { useLang } from "../contexts/LanguageContext";
import { useReveal } from "../hooks/useReveal";

// ── Company logos ──────────────────────────────────────────────────────────
const MentorUpLogo = () => (
  <svg
    width="120"
    height="80"
    viewBox="30 10 540 150"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M168.846 117H162.003V60.9991H170.557L191.354 98.0029L213.052 60.9991H221.606V117H214.763V71.0829L195.046 104.845H187.843L168.846 71.0829V117ZM242.881 91.9707H269.531V81.4368C269.531 80.2963 269.351 79.5461 268.991 79.1859C268.63 78.8258 267.88 78.6457 266.74 78.6457H245.672C244.532 78.6457 243.781 78.8258 243.421 79.1859C243.061 79.5461 242.881 80.2963 242.881 81.4368V91.9707ZM242.251 73.3337H270.071C274.813 73.3337 277.184 75.7046 277.184 80.4464V97.2827H242.881V108.897C242.881 110.097 243.061 110.878 243.421 111.238C243.781 111.538 244.532 111.688 245.672 111.688H266.47C267.67 111.688 268.42 111.538 268.721 111.238C269.081 110.878 269.261 110.097 269.261 108.897V104.665H276.914V109.887C276.914 114.629 274.543 117 269.801 117H242.251C237.509 117 235.138 114.629 235.138 109.887V80.4464C235.138 75.7046 237.509 73.3337 242.251 73.3337ZM301.69 73.3337H322.938C327.679 73.3337 330.05 75.7046 330.05 80.4464V117H322.307V81.4368C322.307 80.2963 322.127 79.5461 321.767 79.1859C321.467 78.8258 320.717 78.6457 319.516 78.6457H299.799C298.719 78.6457 297.938 78.8858 297.458 79.366C296.978 79.8462 296.738 80.6565 296.738 81.7969V84.768H296.648V117H288.905V73.3337H296.648V76.4849C297.308 74.3841 298.989 73.3337 301.69 73.3337ZM363.899 78.6457H352.915V108.447C352.915 109.587 353.095 110.338 353.455 110.698C353.815 111.058 354.565 111.238 355.706 111.238H363.809V117H352.284C347.543 117 345.172 114.629 345.172 109.887V78.6457H338.149V73.3337H345.172V65.7709H352.915V73.3337H363.899V78.6457ZM405.783 108.897V81.4368C405.783 80.2963 405.603 79.5461 405.243 79.1859C404.943 78.8258 404.193 78.6457 402.992 78.6457H382.465C381.264 78.6457 380.484 78.8258 380.124 79.1859C379.824 79.5461 379.673 80.2963 379.673 81.4368V108.897C379.673 110.097 379.824 110.878 380.124 111.238C380.484 111.538 381.264 111.688 382.465 111.688H402.992C404.193 111.688 404.943 111.538 405.243 111.238C405.603 110.878 405.783 110.097 405.783 108.897ZM379.133 73.3337H406.323C411.065 73.3337 413.436 75.7046 413.436 80.4464V109.887C413.436 114.629 411.065 117 406.323 117H379.133C374.391 117 372.021 114.629 372.021 109.887V80.4464C372.021 75.7046 374.391 73.3337 379.133 73.3337ZM440.817 73.3337H450.18V78.8258H439.646C435.745 78.8258 433.794 81.0766 433.794 85.5783V117H426.051V73.3337H433.794V78.8258C434.755 75.1644 437.095 73.3337 440.817 73.3337ZM474.864 60.9991V108.897C474.864 110.097 475.044 110.878 475.404 111.238C475.765 111.538 476.515 111.688 477.655 111.688H496.382C497.523 111.688 498.273 111.538 498.633 111.238C498.993 110.878 499.173 110.097 499.173 108.897V60.9991H511.148V109.887C511.148 114.629 508.777 117 504.035 117H469.912C465.171 117 462.8 114.629 462.8 109.887V60.9991H474.864ZM560.24 90.6202V69.1022C560.24 67.9017 560.06 67.1514 559.7 66.8513C559.4 66.4912 558.649 66.3111 557.449 66.3111H535.751V93.4112H557.449C558.649 93.4112 559.4 93.2311 559.7 92.871C560.06 92.5109 560.24 91.7606 560.24 90.6202ZM523.686 60.9991H565.102C569.843 60.9991 572.214 63.37 572.214 68.1118V91.6105C572.214 96.3523 569.843 98.7232 565.102 98.7232H535.751V117H523.686V60.9991Z"
      fill="white"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M90.5462 33.3549C88.6727 32.2652 86.3584 32.2652 84.4849 33.3549L41.7887 58.189C39.9332 59.2683 38.7916 61.2529 38.7916 63.3994V113.145C38.7916 115.292 39.9332 117.277 41.7887 118.356L84.4849 143.19C86.3584 144.28 88.6727 144.28 90.5462 143.19L105.038 134.761L118.202 142.417C119.755 143.321 120.532 143.772 121.17 143.712C121.751 143.656 122.279 143.348 122.618 142.869C122.989 142.344 122.989 141.44 122.989 139.633V124.319L133.242 118.356C135.098 117.277 136.24 115.292 136.24 113.145V63.3994C136.24 61.2529 135.098 59.2683 133.242 58.189L90.5462 33.3549Z"
      fill="#FFD61E"
    />
    <path
      d="M75.8925 28.3076C77.7575 27.2308 80.0552 27.2308 81.9202 28.3076L125.048 53.2079C126.914 54.2846 128.062 56.2745 128.062 58.428V108.229C128.062 110.382 126.914 112.372 125.048 113.449L81.9202 138.349C80.0552 139.426 77.7575 139.426 75.8925 138.349L32.7639 113.449C30.8989 112.372 29.75 110.382 29.75 108.229V58.428C29.75 56.2745 30.8989 54.2846 32.7639 53.2078L75.8925 28.3076Z"
      fill="#00417D"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M49.454 103.551L79.859 83.7045L49.4675 64.5092L52.6863 59.4128L87.0461 81.1146L87.0841 86.1865L52.7487 108.598L49.454 103.551Z"
      fill="white"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M75.3909 104.928H105.529V110.956H75.3909V104.928Z"
      fill="white"
    />
  </svg>
);

type LogoProps = { className?: string };

const logos: Record<string, (p: LogoProps) => JSX.Element> = {
  caixabank: ({ className }) => (
    <img
      src="/logo-caixabank.webp"
      alt="CaixaBank Tech"
      className={`object-contain ${className} relative top-[-2px]`}
    />
  ),
  mentorup: ({ className }) => (
    <div className={`flex items-center ${className} relative top-[-5px]`}>
      <MentorUpLogo />
    </div>
  ),
  pisos: ({ className }) => (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src="https://www.habitatsoft.com/images/assets/svg/logoHS.svg"
        alt="Habitatsoft"
        className="h-8 object-contain"
        style={{ filter: "contrast(0.7)" }}
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />
      <span className="text-neutral-500 text-xl">/</span>
      <img
        src="https://statics.imghs.net/dist/img/pisos-logo-white.svg"
        alt="Pisos.com"
        className="h-5 object-contain relative top-[-5px]"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />
    </div>
  ),
  paldental: ({ className }) => (
    <img
      src="/logo-paldental.webp"
      alt="Clínica Paldental"
      className={`object-contain ${className} relative top-[-5px] h-8`}
    />
  ),
  sidertia: () => (
    <img
      src="/logo-sidertia.png"
      alt="Sidertia"
      className={`object-contain rounded-lg relative top-[-5px] h-12 w-12`}
    />
  ),
};

const logoKeys = ["caixabank", "mentorup", "pisos", "paldental", "sidertia"];

function TimelineItem({
  job,
  index,
  currentLabel,
}: {
  job: {
    date: string;
    company: string;
    role: string;
    current: boolean;
    desc: string;
    tech: readonly string[];
  };
  index: number;
  currentLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const Logo = logos[logoKeys[index]];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("visible");
          obs.unobserve(el);
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="timeline-item relative flex gap-8"
      style={{ transitionDelay: `${index * 0.08}s` }}
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
        {Logo && (
          <div className="h-8 flex items-center mb-3">
            <Logo className="h-7 max-w-[130px]" />
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
          {job.tech.map((t) => (
            <span
              key={t}
              className="bg-[rgba(59,130,246,0.07)] border border-[rgba(59,130,246,0.18)] rounded px-2 py-0.5 font-mono text-[0.72rem] text-[var(--text-muted)]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const { t } = useLang();
  const h = useReveal();

  return (
    <section id="experience" className="py-24 px-6 bg-[var(--bg2)]">
      <div className="max-w-6xl mx-auto">
        <div ref={h.ref} className={`reveal ${h.visible ? "visible" : ""}`}>
          <div className="font-mono text-[0.78rem] text-cyan uppercase tracking-[0.15em] mb-3">
            {t.experience.tag}
          </div>
          <h2 className="font-syne text-[clamp(1.9rem,4vw,2.7rem)] font-extrabold leading-[1.15] mb-12">
            {t.experience.title}
            <br />
            <span className="grad">{t.experience.titleGrad}</span>
          </h2>
        </div>
        <div className="flex flex-col">
          {t.experience.jobs.map((job, i) => (
            <TimelineItem
              key={job.company + job.date}
              job={job}
              index={i}
              currentLabel={t.experience.current}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
