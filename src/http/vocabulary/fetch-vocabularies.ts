import type { Vocabulary } from "@/@types/vocabulary";
import { api } from "@/lib/axios";
import { queryOptions } from "@tanstack/react-query";
import { toast } from "sonner";

interface FetchVocabulariesResponse {
  data: Vocabulary[];
}

const QUERY_KEY = ["vocabulary"];

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

export const optionsFetchVocabularies = () => {
  return queryOptions({
    queryKey: QUERY_KEY,
    queryFn: FetchVocabularies,
  });
};
