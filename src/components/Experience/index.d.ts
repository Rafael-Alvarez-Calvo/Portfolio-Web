export interface CompanyLogoProps {
  className?: string;
}

export interface ExperienceJob {
  date: string;
  company: string;
  role: string;
  current: boolean;
  desc: string;
  tech: readonly string[];
}

export interface TimelineItemProps {
  job: ExperienceJob;
  index: number;
  currentLabel: string;
}
