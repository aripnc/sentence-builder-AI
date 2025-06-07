"use client";
import type { Vocabulary } from "@/@types/vocabulary";
import { vocabulariesType } from "@/app/(app)/vocabularies/helpers";
import { vocabulariesDifficulty } from "@/app/(app)/vocabularies/helpers";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FetchVocabularies } from "@/http/fetch-vocabularies";
import { updateVocabulary } from "@/http/update-vocabulary";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Edit2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type EditFormProps = {
  vocabulary: Vocabulary;
};

const formSchema = z.object({
  difficulty: z.string(),
  type: z.string(),
});

export default function EditForm({ vocabulary }: EditFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      difficulty: "",
      type: "",
    },
  });

  const { watch } = form;
  const difficulty = watch("difficulty");
  const type = watch("type");
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: updateVocabulary,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { difficulty, type } = values;
    vocabulary.difficulty = difficulty ? difficulty : vocabulary.difficulty;
    vocabulary.type = type ? type : vocabulary.type;

    await mutation.mutateAsync({
      vocabulary,
    });

    await queryClient.invalidateQueries(
      queryOptions({
        queryKey: ["vocabularies"],
        queryFn: FetchVocabularies,
      }),
    );
    setIsOpen(false);
  }

  const isBtnAtualizarDisabled = !difficulty && !type;

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>
          <Button variant="ghost" size="icon">
            <Edit2Icon size={16} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:min-w-[700px]">
          <DialogHeader>
            <DialogTitle>Tem certeza?</DialogTitle>
            <DialogDescription>
              Isso irá atualizar o contexto do deu vocabulário.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Dificuldade</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a dificuldade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {vocabulariesDifficulty.map((d, i) => (
                          <SelectItem key={i} value={d.value}>
                            {d.name}
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
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Tipo</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
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

              <Button
                variant="default"
                className="w-full"
                type="submit"
                disabled={isBtnAtualizarDisabled}
              >
                Atualizar
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
