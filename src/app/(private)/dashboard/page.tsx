"use client";
import type { SentenceProps } from "@/@types/sentence";
import type { UserSessionProps } from "@/@types/user-session";
import { CreateWord } from "@/app/http/create-word";
import { GenerateSentences } from "@/app/http/generate-sentences";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Sentences from "./components/sentences";
import { SkeletonSentences } from "./components/skeleton-sentences";

const formSchema = z.object({
  word: z.string().nonempty({ message: "Informe uma palavra" }),
});

export default function DashBoard() {
  const [palavra, setPalavra] = useState("");
  const [frases, setFrases] = useState<SentenceProps[]>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      word: "",
    },
  });

  const handleGenerate = async (data: z.infer<typeof formSchema>) => {
    const { word } = data;
    setPalavra(word);
    setFrases([]);

    startTransition(async () => {
      const sentences = await GenerateSentences({ word });
      setFrases(sentences);

      if (sentences) {
        await CreateWord({ word, sentences });
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
              name="word"
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

      {isPending ? (
        <Dialog open>
          <DialogContent>
            <DialogTitle className="text-lg flex items-center gap-x-1">
              Gerando frases <Loader className="animate-spin" />
            </DialogTitle>
            <DialogDescription>
              Estamos gerando suas frases, por favor aguarde...
            </DialogDescription>
          </DialogContent>
        </Dialog>
      ) : (
        <Sentences frases={frases ?? []} />
      )}
    </div>
  );
}
