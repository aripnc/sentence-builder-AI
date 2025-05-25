import type { SentenceProps } from "@/@types/sentence-chat";
import { api } from "@/lib/axios";
import { toast } from "sonner";

interface GenerateSentencesReqProps {
  word: string;
}

interface GenerateSentencesResProps {
  data: SentenceProps[];
}

export async function GenerateSentences({ word }: GenerateSentencesReqProps) {
  try {
    const { data } = await api.post<GenerateSentencesResProps>("/chat", {
      word,
    });

    toast.success("Frases geradas com sucesso");
    return data.data;
  } catch (error) {
    console.error(error);
    toast.error("Error ao gerar frases", {
      description: `${error}`,
    });
  }
}
