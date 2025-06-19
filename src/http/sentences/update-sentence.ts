import type { SentenceProps } from "@/@types/vocabulary";
import { toast } from "@/hooks/use-toast";
import { api } from "@/lib/axios";

interface UpdateSentenceRequest {
  sentence: SentenceProps;
}

export async function UpdateSentence({ sentence }: UpdateSentenceRequest) {
  try {
    await api.put("/sentences", {
      sentence,
    });
    toast({
      title: "Frase atualizada com sucesso",
      variant: "success",
    });
  } catch (error) {
    console.error(error);
    toast({
      title: "Erro ao atualizar frases",
      variant: "destructive",
    });
  }
}
