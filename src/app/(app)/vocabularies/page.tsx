"use client";
import type { SentenceChatProps } from "@/@types/sentence-chat";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
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
import { classificacaoSchema } from "@/contracts";
import { classificacaoHelper, sentencesQuantity } from "@/helpers";
import { toast } from "@/hooks/use-toast";
import { trpc } from "@/trpc-client/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { BrushCleaning, IterationCcwIcon, Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Sentences from "./components/sentences";

const formSchema = z.object({
  vocabulary: z.string().nonempty({ message: "Insira um vocabulário" }),
  tipo: classificacaoSchema,
  quantidade: z.string().nonempty({
    message: "Selecione uma quantidade de frases a serem geradas",
  }),
});

export default function Vocabularies() {
  const [frases, setFrases] = useState<SentenceChatProps[] | null>(null);
  const createVocabulary = trpc.createVocabulary.useMutation();
  const generateSentences = trpc.generateSentences.useMutation();
  const createSentences = trpc.createSentences.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vocabulary: "",
      tipo: "Unknown",
      quantidade: "",
    },
  });

  const handleGenerateSentences = async (data: z.infer<typeof formSchema>) => {
    const { vocabulary, quantidade } = data;
    setFrases(null);
    generateSentences.mutate(
      {
        vocabulary,
        quantidade,
      },
      {
        onSuccess: (data) => {
          setFrases(data);
          toast({
            title: "Frases geradas com sucesso",
            variant: "success",
          });
        },
        onError: (err) => {
          console.log("Error ao gerar as frases:", err);
          toast({
            title: "Error ao gerar as frases",
            variant: "destructive",
          });
        },
      },
    );
  };

  const handleSaveVocabularyAndSentences = async (
    formData: z.infer<typeof formSchema>,
  ) => {
    const { vocabulary, tipo } = formData;
    createVocabulary.mutate(
      {
        description: vocabulary,
        type: tipo,
      },
      {
        onSuccess: (data) => {
          createSentences.mutate({
            vocabularyId: data.id,
            sentences: frases!,
          });
          toast({
            title: "Vocabulario e frases salvas",
            variant: "success",
          });
        },
        onError: (data) => {
          toast({
            title: "Error ao salvar vocabulario e frases",
            variant: "destructive",
          });
        },
      },
    );
    handleClear();
  };

  const handleClear = async () => {
    form.reset();
    setFrases(null);
  };

  return (
    <>
      <div className=" w-[800px] border rounded-sm self-center py-10 px-4">
        <Form {...form}>
          <div>
            <form
              onSubmit={form.handleSubmit(handleGenerateSentences)}
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
                        {classificacaoHelper.map((v, i) => (
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
                  disabled={generateSentences.isPending}
                >
                  <IterationCcwIcon size={16} />
                  {generateSentences.isPending
                    ? "Gerando as frases"
                    : "Gerar frases"}
                </Button>
                <Button size="lg" variant="outline" onClick={handleClear}>
                  <BrushCleaning size={16} />
                  Clear
                </Button>
              </div>
            </form>
          </div>
        </Form>
      </div>
      <div className="mt-10 w-[800px] self-center pb-6">
        {generateSentences.isPending && (
          <Dialog open>
            <DialogContent>
              <DialogTitle className="text-lg flex flex-col items-center">
                <Loader className="animate-spin" size={45} />
                Gerando frases
              </DialogTitle>
              <DialogDescription className="text-base text-center">
                Estamos gerando as frases, por favor aguarde...
              </DialogDescription>
            </DialogContent>
          </Dialog>
        )}
        {frases && (
          <div className="space-y-5">
            <Sentences frases={frases ?? []} />
            <Button
              className="w-full text-base"
              variant="success"
              onClick={form.handleSubmit(handleSaveVocabularyAndSentences)}
            >
              Salvar
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
