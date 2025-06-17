import type { Vocabulary } from "@/@types/vocabulary";
import { toast } from "@/hooks/use-toast";
import { api } from "@/lib/axios";

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
    toast({
      title: "Vocabulary criado com sucesso",
      variant: "success",
    });
    return data.data;
  } catch (error) {
    console.error(error);
    toast({
      title: "Erro ao criar vocabulary",
      variant: "destructive",
    });
  }
}
