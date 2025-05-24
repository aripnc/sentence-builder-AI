import type { SentenceProps } from "@/@types/sentence";
import { api } from "@/lib/axios";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface CreateWordRequestProps {
  word: string;
  sentences: SentenceProps[];
}

export async function CreateWord({ word, sentences }: CreateWordRequestProps) {
  try {
    await api.post("/words", {
      word,
      sentences,
    });
  } catch (error) {
    console.error(error);
    toast.error("Error ao criar palavra frases", {
      description: `${error}`,
    });
    return error;
  }
}
