"use client";
import type { Vocabulary } from "@/@types/vocabulary";
import type { ColumnDef } from "@tanstack/react-table";
import EditForm from "../edit-form";
import { SentencesComponent } from "../sentences";

export const columns: ColumnDef<Vocabulary>[] = [
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "difficulty",
    header: "Dificuldade",
    cell: ({ row }) => {
      const dificulty = row.getValue("difficulty");
      if (dificulty === "MEDIUM") {
        return <div className="text-yellow-500">{dificulty}</div>;
      }
      if (dificulty === "EASY") {
        return <div className="text-green-700">{dificulty}</div>;
      }
      if (dificulty === "HARD") {
        return <div className="text-destructive">{dificulty}</div>;
      }
    },
  },
  {
    accessorKey: "type",
    header: "Tipo",
  },
  {
    accessorKey: "action",
    header: "Ações",
    cell: ({ row }) => {
      const vocabulary = row.original;
      return (
        <div className="flex gap-1">
          <SentencesComponent sentences={vocabulary.sentences} />
          <EditForm vocabulary={vocabulary} />
        </div>
      );
    },
  },
];
