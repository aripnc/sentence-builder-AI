import type { Vocabulary } from "@/@types/vocabulary";
import { api } from "@/lib/axios";
import { queryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface CreateVocabularyRequest {
  vocabulary: string;
  tipo: string;
}

interface CreateVocabularyResponse {
  data: Vocabulary;
}

export async function CreateVocabulary({
  vocabulary,
  tipo,
}: CreateVocabularyRequest) {
  try {
    const { data } = await api.post<CreateVocabularyResponse>("/vocabulary", {
      vocabulary,
      tipo,
    });

    return data.data;
  } catch (error) {
    console.error(error);
    toast.error("Error ao criar vocabulary e frases", {
      description: `${error}`,
    });
  }
}
