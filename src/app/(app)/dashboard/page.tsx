"use client";
import { optionsFetchVocabularies } from "@/http/vocabulary/fetch-vocabularies";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./components/data-table/columns";
import { DataTable } from "./components/data-table/data-table";
import { SkeletonDataTable } from "./components/data-table/skeleton-data-table";

export default function Dashboard() {
  const { data, isLoading } = useQuery(optionsFetchVocabularies());

  return (
    <div className="h-full flex flex-col justify-center">
      {isLoading ? (
        <SkeletonDataTable />
      ) : (
        <div className="container mx-auto">
          <DataTable columns={columns} data={data || []} />
        </div>
      )}
    </div>
  );
}
