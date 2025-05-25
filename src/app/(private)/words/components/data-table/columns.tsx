"use client";

import type { Word } from "@/@types/word";

import type { ColumnDef } from "@tanstack/react-table";
import { SentencesComponent } from "../sentences";

export const columns: ColumnDef<Word>[] = [
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "action",
    header: "Ações",
    cell: ({ row }) => {
      return <SentencesComponent sentences={row.original.sentences} />;
    },
  },
];
