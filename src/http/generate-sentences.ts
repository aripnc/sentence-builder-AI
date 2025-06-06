import type { SentenceChatProps } from "@/@types/sentence-chat";
import { api } from "@/lib/axios";
import { toast } from "sonner";

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

    toast.success("Frases geradas com sucesso");
    return data.data;
  } catch (error) {
    console.error(error);
    toast.error("Error ao gerar frases", {
      description: `${error}`,
    });
  }
}
