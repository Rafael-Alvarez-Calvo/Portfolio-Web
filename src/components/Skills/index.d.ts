export interface SkillPill {
  name: string;
  isHighlighted?: boolean;
  isAiRelated?: boolean;
}

export interface SkillGroup {
  label: string;
  pills: readonly SkillPill[];
}
