import type { SentenceChatProps } from "@/@types/sentence-chat";
import { toast } from "@/hooks/use-toast";
import { api } from "@/lib/axios";

interface GenerateSentencesRequest {
  vocabularyId: string;
  sentences: SentenceChatProps[];
}

export async function CreateSentences({
  vocabularyId,
  sentences,
}: GenerateSentencesRequest) {
  try {
    await api.post("/sentences", {
      vocabularyId,
      sentences,
    });
    toast({
      title: "Frases criadas com sucesso",
      variant: "success",
    });
  } catch (error) {
    console.error(error);
    toast({
      title: "Erro ao criar frases",
      variant: "destructive",
    });
  }
}
