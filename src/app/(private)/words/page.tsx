"use client";
import type { UserSessionProps } from "@/@types/user-session";
import type { Word } from "@/@types/word";
import { FetchWords } from "@/http/fetch-words";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { columns } from "./components/data-table/columns";
import { DataTable } from "./components/data-table/data-table";

export default function Words() {
  const { data: session } = useSession();
  const user = session?.user as UserSessionProps;
  const [words, setWords] = useState<Word[]>([]);

  useEffect(() => {
    async function handleFetchWords() {
      const words = await FetchWords();
      setWords(words || []);
    }
    console.log(words);
    handleFetchWords();
  }, [user]);

  return (
    <div className="h-full flex flex-col justify-center">
      <div className="container mx-auto">
        <DataTable columns={columns} data={words || []} />
      </div>
    </div>
  );
}
