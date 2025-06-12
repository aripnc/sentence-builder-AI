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
import { CreateSentences } from "@/http/sentences/create-sentences";
import { GenerateSentences } from "@/http/sentences/generate-sentences";
import { CreateVocabulary } from "@/http/vocabulary/create-vocabulary";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { vocabulariesType } from "./components/helpers";
import { sentencesQuantity } from "./components/helpers";
import Sentences from "./components/sentences";

const formSchema = z.object({
  vocabulary: z.string().nonempty({ message: "Insira um vocabulário" }),
  tipo: z.string().nonempty({ message: "Selecione um tipo" }),
  quantidade: z.string().nonempty({
    message: "Selecione uma quantidade de frases a serem geradas",
  }),
});

export default function Vocabularies() {
  const [frases, setFrases] = useState<SentenceChatProps[] | null>(null);

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
    const { vocabulary, quantidade } = data;
    setFrases(null);

    startTransition(async () => {
      const sentences = await GenerateSentences({ vocabulary, quantidade });

      setFrases(sentences!);
    });
  };

  const handleSaveVocabulary = async (formData: z.infer<typeof formSchema>) => {
    const { vocabulary, tipo } = formData;
    const data = await CreateVocabulary({ vocabulary, tipo });
    const vocabularyId = data?.id as string;
    if (frases) {
      await CreateSentences({ vocabularyId, sentences: frases });
    }
    handleClear();
  };

  const handleClear = async () => {
    form.reset();
    setFrases(null);
  };

  return (
    <>
      <div className="mt-10 w-[800px] border rounded-xl self-center py-3 px-4">
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
                    <Select onValueChange={field.onChange} value={field.value}>
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
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma quantidade de frases a gerar" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sentencesQuantity.map((s, i) => (
                          <SelectItem key={i} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-x-4 w-full">
                <Button
                  className="text-base"
                  size="lg"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? "Gerando as frases" : "Gerar frases"}
                </Button>
                <Button size="lg" variant="outline" onClick={handleClear}>
                  Clear
                </Button>
              </div>
            </form>
          </div>
        </Form>
      </div>
      <div className="mt-10 w-[800px] self-center">
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
          <div className="space-y-5">
            <Sentences frases={frases ?? []} />
            {frases && (
              <Button
                className="w-full text-base"
                variant="outline"
                onClick={form.handleSubmit(handleSaveVocabulary)}
              >
                Salvar
              </Button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
