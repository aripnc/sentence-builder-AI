"use client";

import type { UserSessionProps } from "@/@types/user-session";
import type { Word } from "@/@types/word";
import { FetchWords } from "@/app/http/fetch-words";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Words() {
  const { data: session } = useSession();
  const user = session?.user as UserSessionProps;
  const [words, setWords] = useState<Word[]>([]);

  useEffect(() => {
    async function handleFetchWords() {
      const words = await FetchWords();
      if (words) {
        setWords(words);
      }
    }
    handleFetchWords();
  }, [user]);

  return (
    <div>
      <h2>Pagina das palavras</h2>

      {words && (
        <div className="flex flex-col items-center space-y-3 text-muted-foreground">
          {words.map((w, i) => (
            <div key={i}>
              <p>ID: {w.id}</p>
              <p>descrição: {w.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
