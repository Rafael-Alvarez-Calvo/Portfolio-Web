import type { ContactLink, ContactButtonStyle, ContactFormStatus } from "./index";

export const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
export const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
export const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;
export const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string;

export const CONTACT_LINKS: ContactLink[] = [
  { icon: '✉️', label: 'rafael.alvarez@hotmail.es', href: 'mailto:rafael.alvarez@hotmail.es' },
  { icon: '📱', label: '+34 610 385 927', href: 'tel:+34610385927' },
  { icon: '💼', label: 'linkedin.com/in/rafael-ac', href: 'https://www.linkedin.com/in/rafael-ac/' },
  { icon: '🐙', label: 'github.com/Rafael-Alvarez-Calvo', href: 'https://github.com/Rafael-Alvarez-Calvo' },
];

export const CONTACT_BUTTON_STYLE_BY_STATUS: Record<ContactFormStatus, ContactButtonStyle> = {
  idle: { gradientClassName: 'from-blue to-[#1d4ed8]', shadowColor: 'rgba(59,130,246,0.3)' },
  loading: { gradientClassName: 'from-[#1d4ed8] to-[#1e3a8a]', shadowColor: 'rgba(59,130,246,0.2)' },
  success: { gradientClassName: 'from-mint to-[#059669]', shadowColor: 'rgba(16,185,129,0.4)' },
  error: { gradientClassName: 'from-red-500 to-red-700', shadowColor: 'rgba(239,68,68,0.3)' },
};
