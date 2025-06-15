"use client";
import type { Vocabulary } from "@/@types/vocabulary";
import type { ColumnDef } from "@tanstack/react-table";
import RowActions from "./row-actions";

import { Badge } from "@/components/ui/badge";

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
        return (
          <Badge variant="outline" className="font-semibold">
            {dificulty}
          </Badge>
        );
      }
      if (dificulty === "EASY") {
        return (
          <Badge variant="success" className="font-semibold">
            {dificulty}
          </Badge>
        );
      }
      if (dificulty === "HARD") {
        return (
          <Badge variant="destructive" className="font-semibold">
            {dificulty}
          </Badge>
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
