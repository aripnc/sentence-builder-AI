export type SentenceProps = {
  id: string;
  description: string;
  translation: string;
};

export interface Vocabulary {
  id: string;
  description: string;
  difficulty: string;
  type: string;
  sentences: SentenceProps[];
}
