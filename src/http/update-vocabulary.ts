import type { Vocabulary } from "@/@types/vocabulary";
import { api } from "@/lib/axios";
import { toast } from "sonner";

type UpdateVocabularyRequest = {
  vocabulary: Vocabulary;
};

export async function updateVocabulary({
  vocabulary,
}: UpdateVocabularyRequest) {
  try {
    await api.put("/vocabulary", { vocabulary });
    toast.success("Vocabulario atualizado");
  } catch (error) {
    toast.error("Erro ao atualizar vocabulario", {
      description: `${error}`,
    });
  }
}
