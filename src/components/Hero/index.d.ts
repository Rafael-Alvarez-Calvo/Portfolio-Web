export interface HeroIcon {
  label: string;
  color: string;
  backgroundColor: string;
  borderColor: string;
  animationDelay: number;
  position: { top: string; left?: string; right?: string };
  icon: JSX.Element;
}
