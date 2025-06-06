import type { SentenceChatProps } from "@/@types/sentence-chat";
import { api } from "@/lib/axios";
import { toast } from "sonner";

interface CreateVocabularyRequest {
  vocabulary: string;
  tipo: string;
  sentences: SentenceChatProps[];
}

export async function CreateVocabulary({
  vocabulary,
  tipo,
  sentences,
}: CreateVocabularyRequest) {
  try {
    await api.post("/vocabulary", {
      vocabulary,
      tipo,
      sentences,
    });
  } catch (error) {
    console.error(error);
    toast.error("Error ao criar vocabulary e frases", {
      description: `${error}`,
    });
    return error;
  }
}
