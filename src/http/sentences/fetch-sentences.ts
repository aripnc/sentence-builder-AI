import type { SentenceProps } from "@/@types/vocabulary";
import { toast } from "@/hooks/use-toast";
import { api } from "@/lib/axios";

interface FetchResponseProps {
  data: SentenceProps[];
}

export async function FetchSentences() {
  try {
    const { data } = await api.get<FetchResponseProps>("/sentences");

    return data.data;
  } catch (error) {
    console.error(error);
    toast({
      title: "Erro ao consultar frases",
      variant: "destructive",
    });
  }
}
