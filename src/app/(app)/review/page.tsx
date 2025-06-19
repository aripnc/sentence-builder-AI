"use client";

import type { SentenceProps } from "@/@types/vocabulary";
import { Button } from "@/components/ui/button";
import { FetchSentences } from "@/http/sentences/fetch-sentences";
import { UpdateSentence } from "@/http/sentences/update-sentence";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Eye, Frown, Smile, ThumbsUp } from "lucide-react";
import { useState } from "react";

export default function Review() {
  const queryClient = useQueryClient();
  const { data: sentences = [], isLoading } = useQuery({
    queryKey: ["sentences"],
    queryFn: FetchSentences,
  });

  const mutation = useMutation({
    mutationFn: UpdateSentence,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sentences"] });
    },
    onError: (error) => {
      console.log("Update error:", error);
    },
  });

  const rowsPerPage = 1;
  const [currentPage, setCurrentPage] = useState(1);
  const [showTranslation, setShowTranslation] = useState(false);

  const currentSentence =
    sentences.length > 0
      ? sentences[(currentPage - 1) * rowsPerPage]
      : sentences[1];
  console.log(sentences);

  const handleNext = () => {
    if (currentPage < Math.ceil(sentences.length / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(1);
    }
    setShowTranslation(false);
  };

  const handleYes = async () => {
    currentSentence.repetitions = currentSentence.repetitions + 1;
    currentSentence.fator = currentSentence.fator + 0.3;

    if (currentSentence.repetitions <= 1) {
      currentSentence.interval = 1;
    }

    if (currentSentence.repetitions === 2) {
      currentSentence.interval = 6;
    }

    if (currentSentence.repetitions > 2) {
      currentSentence.interval =
        currentSentence.interval * currentSentence.fator;
    }

    let nextReviewDate = dayjs(currentSentence.nextReview).format("DD/MM/YYYY");
    const now = new Date().getTime();
    const intervalInMilliseconds =
      currentSentence.interval * 24 * 60 * 60 * 1000;
    nextReviewDate = new Date(now + intervalInMilliseconds).toISOString();
    currentSentence.nextReview = nextReviewDate;

    await mutation.mutateAsync({
      sentence: currentSentence,
    });

    handleNext();
  };

  const handleNo = async () => {
    currentSentence.repetitions = 0;
    currentSentence.fator = 2.5;
    currentSentence.interval = 1;

    const now = new Date().getTime();
    currentSentence.nextReview = new Date(now + 1).toISOString();

    await mutation.mutateAsync({
      sentence: currentSentence,
    });
    console.log(currentSentence);

    handleNext();
  };

  const handleShowTranslation = () => {
    setShowTranslation(true);
  };

  return (
    <div>
      {!sentences.length ? (
        <div className="flex flex-col mt-28 space-y-28 items-center justify-center">
          <div className="text-xl flex gap-2 items-center">
            Parabéns!! Você já revisou tudo por hoje{" "}
            <ThumbsUp className="text-success" size={24} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col mt-28 space-y-28 items-center justify-center">
          <div className="space-y-4">
            <div className="flex flex-col space-y-3 items-center">
              <Button
                onClick={handleShowTranslation}
                variant="outline"
                size="sm"
              >
                Tradução
                <Eye size={16} />
              </Button>
              <div className="text-2xl flex gap-2 items-center">
                {currentSentence?.description}
              </div>
              {showTranslation && (
                <div className="text-xl text-muted-foreground">
                  {currentSentence?.translation}
                </div>
              )}
            </div>
          </div>
          <div className="space-y-3 flex flex-col items-center">
            <div className="text-lg">Entendeu a frase?</div>
            <div className="space-x-5">
              <Button
                variant="success"
                size="sm"
                className="text-base"
                onClick={handleYes}
              >
                Sim
                <Smile size={16} />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                className="text-base"
                onClick={handleNo}
              >
                Não
                <Frown size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
