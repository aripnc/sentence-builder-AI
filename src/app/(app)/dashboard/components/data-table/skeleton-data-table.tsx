"use client";
import { Skeleton } from "@/components/ui/skeleton";
export function SkeletonDataTable() {
  return (
    <div className="mt-4 px-10">
      <Skeleton className="w-full h-[700px] rounded-xl bg-card" />
    </div>
  );
}
