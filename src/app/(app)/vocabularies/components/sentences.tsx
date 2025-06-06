"use client";

import type { SentenceChatProps } from "@/@types/sentence-chat";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface SentencesPageProps {
  frases: SentenceChatProps[];
}

export default function Sentences({ frases }: SentencesPageProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  return (
    <div>
      {frases.map((s, i) => (
        <Card key={i} className="p-0 mt-5 shadow-accent">
          <CardContent className="flex flex-col space-y-3 px-5 py-2">
            <div key={i} className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="font-semibold text-base tracking-wide">
                  {s.frase}
                </p>
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
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
