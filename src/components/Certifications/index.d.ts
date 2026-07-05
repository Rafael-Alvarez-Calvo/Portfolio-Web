export interface Certification {
  icon: string;
  name: string;
  meta: string;
}

export interface CertificationCardProps {
  certification: Certification;
  delay: number;
}
