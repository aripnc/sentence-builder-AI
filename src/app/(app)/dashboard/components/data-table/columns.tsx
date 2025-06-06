"use client";

import type { Vocabulary } from "@/@types/vocabulary";
import type { ColumnDef } from "@tanstack/react-table";
import { SentencesComponent } from "../sentences";

export const columns: ColumnDef<Vocabulary>[] = [
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "difficulty",
    header: "Dificuldade",
  },
  {
    accessorKey: "type",
    header: "Tipo",
  },
  {
    accessorKey: "action",
    header: "Ações",
    cell: ({ row }) => {
      return <SentencesComponent sentences={row.original.sentences} />;
    },
  },
];
