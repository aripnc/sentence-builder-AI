"use client";

import type { Vocabulary } from "@/@types/vocabulary";
import EditForm from "../edit-form";
import { SentencesComponent } from "../sentences";

type RowActionsProps = {
  vocabulary: Vocabulary;
};

export default function RowActions({ vocabulary }: RowActionsProps) {
  return (
    <div className="flex gap-1">
      <SentencesComponent vocabulary={vocabulary} />
      <EditForm vocabulary={vocabulary} />
    </div>
  );
}
