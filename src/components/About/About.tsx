import { useLang } from "../../contexts/LanguageContext";
import { useReveal } from "../../hooks/useReveal";
import { CODE_SYNTAX_COLOR_CLASS_NAME_BY_KEY } from "./About.constants";
import type { CodeLine } from "./index";

export const About = () => {
  const { translations } = useLang();
  const codeSnippetTranslations = translations.about.code;
  const left = useReveal();
  const right = useReveal();
  const codeLines: CodeLine[] = [
    [{ colorKey: "dim", value: codeSnippetTranslations.comment }],
    [],
    [
      { colorKey: "keyword", value: "const " },
      { colorKey: "variableName", value: "rafael" },
      { colorKey: "text", value: " = {" },
    ],
    [
      { colorKey: "objectKey", value: codeSnippetTranslations.nombre },
      { colorKey: "text", value: ": " },
      { colorKey: "string", value: '"Rafael Álvarez Calvo"' },
      { colorKey: "text", value: "," },
    ],
    [
      { colorKey: "objectKey", value: codeSnippetTranslations.rol },
      { colorKey: "text", value: ": " },
      { colorKey: "string", value: `"${codeSnippetTranslations.roleValue}"` },
      { colorKey: "text", value: "," },
    ],
    [
      { colorKey: "objectKey", value: codeSnippetTranslations.ubicacion },
      { colorKey: "text", value: ": " },
      { colorKey: "string", value: `"${codeSnippetTranslations.locationValue}"` },
      { colorKey: "text", value: "," },
    ],
    [
      { colorKey: "objectKey", value: codeSnippetTranslations.experiencia },
      { colorKey: "text", value: ": " },
      { colorKey: "number", value: "4" },
      { colorKey: "dim", value: ` ${codeSnippetTranslations.years}` },
      { colorKey: "text", value: "," },
    ],
    [
      { colorKey: "objectKey", value: codeSnippetTranslations.especialidades },
      { colorKey: "text", value: ": [" },
    ],
    [
      { colorKey: "string", value: `"${codeSnippetTranslations.specialtyOne}"` },
      { colorKey: "text", value: "," },
    ],
    [
      { colorKey: "string", value: `"${codeSnippetTranslations.specialtyTwo}"` },
      { colorKey: "text", value: "," },
    ],
    [
      { colorKey: "string", value: `"${codeSnippetTranslations.specialtyThree}"` },
      { colorKey: "text", value: "," },
    ],
    [
      { colorKey: "string", value: `"${codeSnippetTranslations.specialtyFour}"` },
      { colorKey: "text", value: "," },
    ],
    [{ colorKey: "text", value: "]," }],
    [
      { colorKey: "objectKey", value: codeSnippetTranslations.disponible },
      { colorKey: "text", value: ": " },
      { colorKey: "boolean", value: "true" },
    ],
    [{ colorKey: "text", value: "};" }],
  ];

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div ref={left.ref} className={`reveal ${left.visible ? 'visible' : ''}`}>
          <div className="font-mono text-[0.78rem] text-cyan uppercase tracking-[0.15em] mb-3">{translations.about.tag}</div>
          <h2 className="font-syne text-[clamp(1.9rem,4vw,2.7rem)] font-extrabold leading-[1.15] mb-4">
            {translations.about.title}<br/><span className="grad">{translations.about.titleGrad}</span>
          </h2>
          <p className="text-[var(--text-muted)] text-[0.97rem] leading-[1.8] mb-4">
            {translations.about.paragraphOneIntro} <strong className="text-[var(--text)] font-medium">{translations.about.paragraphOneCompanyOne}</strong> {translations.about.paragraphOneConnector} <strong className="text-[var(--text)] font-medium">{translations.about.paragraphOneCompanyTwo}</strong>{translations.about.paragraphOneOutro}
          </p>
          <p className="text-[var(--text-muted)] text-[0.97rem] leading-[1.8] mb-8">
            {translations.about.paragraphTwoIntro} <strong className="text-[var(--text)] font-medium">{translations.about.paragraphTwoHighlight}</strong>{translations.about.paragraphTwoOutro}
          </p>
          <div className="flex gap-3 flex-wrap">
            <a href="https://github.com/Rafael-Alvarez-Calvo" target="_blank" rel="noreferrer" className="border border-[var(--border)] text-[var(--text)] text-sm font-semibold px-4 py-2 rounded-lg hover:border-blue hover:bg-[rgba(59,130,246,0.05)] transition-all">🐙 GitHub</a>
            <a href="https://www.linkedin.com/in/rafael-ac/" target="_blank" rel="noreferrer" className="border border-[var(--border)] text-[var(--text)] text-sm font-semibold px-4 py-2 rounded-lg hover:border-blue hover:bg-[rgba(59,130,246,0.05)] transition-all">💼 LinkedIn</a>
          </div>
        </div>
        <div ref={right.ref} className={`reveal d2 ${right.visible ? 'visible' : ''}`}>
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 font-mono text-[0.82rem] leading-[1.9]">
            {codeLines.map((codeLine, lineIndex) => (
              <div key={lineIndex} style={{ marginLeft: lineIndex >= 8 && lineIndex <= 11 ? '3rem' : (lineIndex >= 7 && lineIndex <= 12 ? '1.5rem' : lineIndex >= 3 && lineIndex <= 14 ? '1.5rem' : '0') }}>
                {codeLine.length === 0 ? <br/> : codeLine.map((codeLinePart, partIndex) => <span key={partIndex} className={CODE_SYNTAX_COLOR_CLASS_NAME_BY_KEY[codeLinePart.colorKey]}>{codeLinePart.value}</span>)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
