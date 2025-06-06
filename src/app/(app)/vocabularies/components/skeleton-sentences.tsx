"use client";
import { Skeleton } from "@/components/ui/skeleton";
export function SkeletonSentences() {
  return (
    <div className="mt-4">
      <Skeleton className="h-[400px] w-full rounded-xl bg-slate-100" />
    </div>
  );
}
