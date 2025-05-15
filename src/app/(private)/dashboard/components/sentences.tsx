"use client";

import type { SentenceProps } from "@/@types/sentence";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SentencesPageProps {
  frases: SentenceProps[];
}

export default function Sentences({ frases }: SentencesPageProps) {
  return (
    <Card className="mt-7">
      <CardHeader>
        <CardTitle>Frases</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-3 px-2">
        {frases.map((s, i) => (
          <div key={i} className="space-y-1">
            <p className="font-semibold">{s.frase}</p>
            <p className="text-slate-400">{s.traducao}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
