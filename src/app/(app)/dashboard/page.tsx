"use client";
import type { Vocabulary } from "@/@types/vocabulary";
import { FetchVocabularies } from "@/http/fetch-vocabularies";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { useTransition } from "react";
import { columns } from "./components/data-table/columns";
import { DataTable } from "./components/data-table/data-table";
import { SkeletonDataTable } from "./components/data-table/skeleton-data-table";

export default function Dashboard() {
  const { data: session } = authClient.useSession();
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const data = await FetchVocabularies();
      setVocabularies(data || []);
    });
  }, [session]);

  return (
    <div className="h-full flex flex-col justify-center">
      {isPending ? (
        <SkeletonDataTable />
      ) : (
        <div className="container mx-auto">
          <DataTable columns={columns} data={vocabularies || []} />
        </div>
      )}
    </div>
  );
}
