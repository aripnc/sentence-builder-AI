import type { Word } from "@/@types/word";
import { api } from "@/lib/axios";
import { toast } from "sonner";

interface FetchWordsResProps {
  data: Word[];
}

export async function FetchWords() {
  try {
    const { data } = await api.get<FetchWordsResProps>("/words");
    return data.data;
  } catch (error) {
    console.error(error);
    toast.error("Erro ao buscar palavras", {
      description: `${error}`,
    });
  }
}
