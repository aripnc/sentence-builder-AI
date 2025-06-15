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
  difficulty: string;
  type: string;
  sentences: SentenceProps[];
}
