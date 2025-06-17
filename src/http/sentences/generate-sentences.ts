import type { SentenceChatProps } from "@/@types/sentence-chat";

import { toast } from "@/hooks/use-toast";
import { api } from "@/lib/axios";

interface GenerateSentencesRequest {
  vocabulary: string;
  quantidade: string;
}

interface GenerateSentencesResponse {
  data: SentenceChatProps[];
}

export async function GenerateSentences({
  vocabulary,
  quantidade,
}: GenerateSentencesRequest) {
  try {
    const { data } = await api.post<GenerateSentencesResponse>("/chat", {
      vocabulary,
      quantidade,
    });

    toast({
      title: "Frases geradas com sucesso",
      variant: "success",
    });
    return data.data;
  } catch (error) {
    console.error(error);
    toast({
      title: "Erro ao gerar frases",
      variant: "destructive",
    });
  }
}
