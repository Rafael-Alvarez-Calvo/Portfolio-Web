export interface ContactLink {
  icon: string;
  label: string;
  href: string;
}

export type ContactFormStatus = "idle" | "loading" | "success" | "error";

export interface ContactButtonStyle {
  gradientClassName: string;
  shadowColor: string;
}
