import type { Vocabulary } from "@/@types/vocabulary";
import { api } from "@/lib/axios";
import { toast } from "sonner";

type UpdateVocabularyProps = {
  vocabulary: Vocabulary;
};

export async function UpdateVocabulary({ vocabulary }: UpdateVocabularyProps) {
  try {
    await api.put("/vocabulary", { vocabulary });
    toast.success("Vocabulario atualizado");
  } catch (error) {
    toast.error(`Erro ao atualizar vocabulario: ${vocabulary.description}`, {
      description: `${error}`,
    });
  }
}
