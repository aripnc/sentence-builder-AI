"use client";
import type { SentenceProps } from "@/@types/vocabulary";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileSearch } from "lucide-react";

interface SentencesComponentProps {
  sentences: SentenceProps[];
}

export function SentencesComponent({ sentences }: SentencesComponentProps) {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <FileSearch size={16} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:min-w-[1200px] min-h-[200px]">
          <DialogTitle>Frases</DialogTitle>
          <Accordion
            type="single"
            collapsible
            className="w-full tracking-tight"
          >
            {sentences.map((sentence, i) => (
              <AccordionItem value={`item-${i}`} key={i}>
                <AccordionTrigger className="text-lg font-semibold ">
                  {sentence.description}
                </AccordionTrigger>
                <AccordionContent className="text-lg text-muted-foreground">
                  {sentence.translation}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </DialogContent>
      </Dialog>
    </div>
  );
}
