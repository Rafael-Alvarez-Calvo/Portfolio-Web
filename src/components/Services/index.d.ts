export interface Service {
  num: string;
  icon: string;
  title: string;
  tag: string;
  desc: string;
  img: string;
  isAiRelated: boolean;
}

export interface ServiceRowProps {
  service: Service;
  index: number;
  aiBadgeLabel: string;
  quoteCtaLabel: string;
}
