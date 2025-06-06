import type { Vocabulary } from "@/@types/vocabulary";
import { api } from "@/lib/axios";
import { toast } from "sonner";

interface FetchVocabulariesResponse {
  data: Vocabulary[];
}

export async function FetchVocabularies() {
  try {
    const { data } = await api.get<FetchVocabulariesResponse>("/vocabulary");
    return data.data;
  } catch (error) {
    console.error(error);
    // toast.error("Erro ao buscar vocabularios", {
    //   description: `${error}`,
    // });
  }
}
