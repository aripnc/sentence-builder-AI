import type { SentenceProps } from "@/@types/vocabulary";
import { api } from "@/lib/axios";
import { toast } from "sonner";

interface FetchResponseProps {
  data: SentenceProps[];
}

export async function FetchSentences() {
  try {
    const { data } = await api.get<FetchResponseProps>("/sentences");

    return data.data;
  } catch (error) {
    console.error(error);
    toast.error("Error ao consultar frases", {
      description: `${error}`,
    });
  }
}
