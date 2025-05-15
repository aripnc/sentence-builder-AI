"use client";
import type { SentenceProps } from "@/@types/sentence";
import type { UserSessionProps } from "@/@types/user-session";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Sentences from "./components/sentences";
import { SkeletonSentences } from "./components/skeleton-sentences";

interface SentenceResponseProps {
  data: SentenceProps[];
}

const formSchema = z.object({
  input: z.string().nonempty({ message: "Informe uma palavra" }),
});

export default function DashBoard() {
  const { data: session } = useSession();
  const [palavra, setPalavra] = useState("");
  const [frases, setFrases] = useState<SentenceProps[]>();
  const user = session?.user as UserSessionProps;
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  });

  const handleGenerate = async (data: z.infer<typeof formSchema>) => {
    const { input } = data;
    setPalavra(input);
    setFrases([]);

    startTransition(async () => {
      try {
        const { data } = await api.post<SentenceResponseProps>("/chat", {
          input,
        });
        setFrases(data.data);

        await api.post("/word", { input, sentences: data.data });

        console.log(data.data);
        toast.success("Frases geradas com sucesso");
      } catch (error) {
        toast.error("Error ao gerar frases", {
          description: `${error}`,
        });
        console.log("error");
        console.log(error);
      }
    });
  };

  return (
    <div className="mt-10 w-[800px] self-center p-2">
      <Form {...form}>
        <div className="">
          <form
            onSubmit={form.handleSubmit(handleGenerate)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="input"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Palavra/Frase verbal</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Insira sua palavra em inglês"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit" disabled={isPending}>
              {isPending ? "Gerando as frases" : "Enviar"}
            </Button>
          </form>
        </div>
      </Form>

      {isPending ? <SkeletonSentences /> : <Sentences frases={frases ?? []} />}
    </div>
  );
}
