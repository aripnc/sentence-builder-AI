"use client";
import type { SentenceChatProps } from "@/@types/sentence-chat";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateVocabulary } from "@/http/create-vocabulary";
import { GenerateSentences } from "@/http/generate-sentences";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Sentences from "./components/sentences";
import { vocabulariesType } from "./helpers";
import { sentencesQuantity } from "./helpers";

const formSchema = z.object({
  vocabulary: z.string().nonempty({ message: "Insira um vocabulário" }),
  tipo: z.string().nonempty({ message: "Selecione um tipo" }),
  quantidade: z.string().nonempty({
    message: "Selecione uma quantidade de frases a serem geradas",
  }),
});

export default function Vocabularies() {
  const [frases, setFrases] = useState<SentenceChatProps[]>();

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vocabulary: "",
      tipo: "",
      quantidade: "",
    },
  });

  const handleGenerate = async (data: z.infer<typeof formSchema>) => {
    const { vocabulary, tipo, quantidade } = data;
    setFrases([]);

    startTransition(async () => {
      const sentences = await GenerateSentences({ vocabulary, quantidade });
      setFrases(sentences);

      if (sentences) {
        await CreateVocabulary({ vocabulary, tipo, sentences });
      }
    });
  };

  return (
    <div className="mt-10 w-[800px] self-center p-2">
      <Form {...form}>
        <div>
          <form
            onSubmit={form.handleSubmit(handleGenerate)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="vocabulary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Vocabulário</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Insira aqui sua palavra em inglês"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tipo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Tipo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {vocabulariesType.map((v, i) => (
                        <SelectItem key={i} value={v.value}>
                          {v.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantidade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Quantidade</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma quantidade de frases a gerar" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sentencesQuantity.map((s, i) => (
                        <SelectItem key={i} value={s.value}>
                          {s.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="w-full text-base"
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Gerando as frases" : "Gerar frases"}
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
              Estamos gerando as frases, por favor aguarde...
            </DialogDescription>
          </DialogContent>
        </Dialog>
      ) : (
        <Sentences frases={frases ?? []} />
      )}
    </div>
  );
}
