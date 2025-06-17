import type { Vocabulary } from "@/@types/vocabulary";
import { toast } from "@/hooks/use-toast";
import { api } from "@/lib/axios";
import { queryOptions } from "@tanstack/react-query";

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
    toast({
      title: "Erro ao consultar vocabularies",
      variant: "destructive",
    });
  }
}

export const optionsFetchVocabularies = () => {
  return queryOptions({
    queryKey: QUERY_KEY,
    queryFn: FetchVocabularies,
  });
};
