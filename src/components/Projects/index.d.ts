export interface Project {
  screenshot: string;
  url: string;
  type: string;
  title: string;
  desc: string;
}

export interface ProjectCardProps {
  project: Project;
  delay: number;
  ctaLabel: string;
}
