"use client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Table as ReactTable } from "@tanstack/react-table";
import { BrushCleaning } from "lucide-react";
import { useState } from "react";

interface FilterDataTableProps<TData> {
  table: ReactTable<TData>;
}

const dificuldades = ["MEDIUM", "HARD", "EASY"];
const classificacoes = [
  "Unknown",
  "PhrasalVerb",
  "Noun",
  "Verb",
  "Adjective",
  "Adverb",
];

export function FilterDataTable<TData>({ table }: FilterDataTableProps<TData>) {
  const [openDificuldade, setDificuldadeOpen] = useState(false);
  const [dificuldade, setDificuldade] = useState<string | null>("");
  const [classificacao, setClassificacao] = useState<string | null>("");
  const [openClassificacao, setClassificacaoOpen] = useState(false);

  return (
    <div className="w-full flex items-center py-4 gap-x-3">
      <Popover open={openDificuldade} onOpenChange={setDificuldadeOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {dificuldade ? <>{dificuldade}</> : <>+ Set Dificuldade</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Change status..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {dificuldades.map((d, i) => (
                  <CommandItem
                    key={i}
                    value={d}
                    onSelect={(value) => {
                      setDificuldade(
                        dificuldades.find((d) => d === value) || null,
                      );
                      table.getColumn("difficulty")?.setFilterValue(d);
                      setDificuldadeOpen(false);
                    }}
                  >
                    {d}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Popover open={openClassificacao} onOpenChange={setClassificacaoOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {classificacao ? <>{classificacao}</> : <>+ Set Classificação</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Change status..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {classificacoes.map((c, i) => (
                  <CommandItem
                    key={i}
                    value={c}
                    onSelect={(value) => {
                      setClassificacao(
                        classificacoes.find((c) => c === value) || null,
                      );
                      table.getColumn("type")?.setFilterValue(c);
                      setClassificacaoOpen(false);
                    }}
                  >
                    {c}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            table.getColumn("type")?.setFilterValue("");
            table.getColumn("difficulty")?.setFilterValue("");
            setDificuldade("");
            setClassificacao("");
          }}
        >
          <BrushCleaning size={16} />
          clear
        </Button>
      </Popover>
    </div>
  );
}
