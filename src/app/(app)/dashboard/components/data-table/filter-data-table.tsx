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
import { classificacaoHelper, dificultyHelper } from "@/helpers";
import type { Table as ReactTable } from "@tanstack/react-table";
import { BrushCleaning } from "lucide-react";
import { useState } from "react";

interface FilterDataTableProps<TData> {
  table: ReactTable<TData>;
}

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
                {dificultyHelper.map((d, i) => (
                  <CommandItem
                    key={i}
                    value={d.value}
                    onSelect={(value) => {
                      setDificuldade(
                        dificultyHelper.filter((d) => d.value === value)[0]
                          .value || null,
                      );
                      table.getColumn("difficulty")?.setFilterValue(d.value);
                      setDificuldadeOpen(false);
                    }}
                  >
                    {d.value}
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
                {classificacaoHelper.map((c, i) => (
                  <CommandItem
                    key={i}
                    value={c.value}
                    onSelect={(value) => {
                      setClassificacao(
                        classificacaoHelper.filter((c) => c.value === value)[0]
                          .value || null,
                      );
                      table.getColumn("type")?.setFilterValue(c.value);
                      setClassificacaoOpen(false);
                    }}
                  >
                    {c.value}
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
