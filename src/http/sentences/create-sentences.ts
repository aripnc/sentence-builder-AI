import type { SentenceChatProps } from "@/@types/sentence-chat";
import { api } from "@/lib/axios";
import { toast } from "sonner";

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
  } catch (error) {
    console.error(error);
    toast.error("Error ao gerar frases", {
      description: `${error}`,
    });
  }
}
