import { useLang } from "../../contexts/LanguageContext";
export const Footer = () => {
  const { translations } = useLang();
  return (
    <footer className="bg-[var(--bg2)] border-t border-[var(--border)] py-8 px-6 text-center">
      <p className="text-[var(--text-dim)] text-[0.84rem]">
        {translations.footer.copy} <span className="text-cyan">Rafael Álvarez Calvo</span>{" "}
        · {translations.footer.role}
      </p>
      <p className="text-[var(--text-dim)] text-[0.84rem] mt-1.5">
        {translations.footer.made}
      </p>
    </footer>
  );
};
