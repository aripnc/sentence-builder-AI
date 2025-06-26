"use client";
import { trpc } from "@/trpc-client/client";
import { columns } from "./components/data-table/columns";
import { DataTable } from "./components/data-table/data-table";
import { SkeletonDataTable } from "./components/data-table/skeleton-data-table";

export default function Dashboard() {
  const data = trpc.fetchVocabularies.useQuery();

  return (
    <div className="h-full flex flex-col justify-center">
      {data.isLoading ? (
        <SkeletonDataTable />
      ) : (
        <div className="container mx-auto">
          <DataTable columns={columns} data={data.data || []} />
        </div>
      )}
    </div>
  );
}
