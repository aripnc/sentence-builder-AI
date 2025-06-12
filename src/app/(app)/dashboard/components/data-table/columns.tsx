"use client";
import type { Vocabulary } from "@/@types/vocabulary";
import type { ColumnDef } from "@tanstack/react-table";
import RowActions from "./row-actions";

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
        return <div className="text-yellow-500 font-semibold">{dificulty}</div>;
      }
      if (dificulty === "EASY") {
        return <div className="text-green-700 font-semibold">{dificulty}</div>;
      }
      if (dificulty === "HARD") {
        return (
          <div className="text-destructive font-semibold">{dificulty}</div>
        );
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
      const data = row.original;
      return <RowActions vocabulary={data} />;
    },
  },
];
