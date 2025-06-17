import type { Vocabulary } from "@/@types/vocabulary";
import { toast } from "@/hooks/use-toast";
import { api } from "@/lib/axios";

type UpdateVocabularyRequest = {
  vocabulary: Vocabulary;
};

export async function updateVocabulary({
  vocabulary,
}: UpdateVocabularyRequest) {
  try {
    await api.put("/vocabulary", { vocabulary });
    toast({
      title: "Vocabulary atualizado!",
      variant: "success",
    });
  } catch (error) {
    toast({
      title: "Erro ao atualizar vocabulary",
      variant: "destructive",
    });
  }
}
