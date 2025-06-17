"use client";

import type { SentenceChatProps } from "@/@types/sentence-chat";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface SentencesPageProps {
  frases: SentenceChatProps[];
}

export default function Sentences({ frases }: SentencesPageProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  return (
    <ScrollArea className="h-72 rounded-md border">
      <div className="space-y-5 px-5 py-5 shadow-accent">
        {frases.map((s, i) => (
          <div
            key={i}
            className="outline-2 rounded-sm p-2 flex items-center justify-between"
          >
            <div className="space-y-2">
              <p className="font-semibold text-base tracking-wide">{s.frase}</p>
              <p className="text-slate-400">{s.traducao}</p>
            </div>

            <CopyToClipboard
              text={s.frase}
              onCopy={() => {
                setCopiedIndex(i);
                setTimeout(() => {
                  setCopiedIndex(null);
                }, 2000);
              }}
            >
              <Button size="icon" variant="ghost">
                {copiedIndex === i ? (
                  <Check color="green" size={16} />
                ) : (
                  <Copy size={16} />
                )}
              </Button>
            </CopyToClipboard>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
