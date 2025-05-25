export type SentenceProps = {
  id: string;
  description: string;
  translation: string;
};

export interface Word {
  id: string;
  description: string;
  sentences: SentenceProps[];
}
