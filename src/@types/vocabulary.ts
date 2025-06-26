export type SentenceProps = {
  id: string;
  description: string;
  translation: string;
  nextReview: string;
  interval: number;
  repetitions: number;
  fator: number;
};

export interface Vocabulary {
  id: string;
  description: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  type: "Unknown" | "Noun" | "Verb" | "Adjective" | "Adverb" | "PhrasalVerb";
}
