"use client";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc-client/client";
import { Eye, Frown, Smile, ThumbsUp } from "lucide-react";
import { useState } from "react";

export default function Review() {
  const fetchSentencesToReview = trpc.fetchSentencesToReview.useQuery();
  const updateSentence = trpc.updateSentence.useMutation({
    onSuccess: () => {
      fetchSentencesToReview.refetch();
    },
  });

  const rowsPerPage = 1;
  const [currentPage, setCurrentPage] = useState(1);
  const [showTranslation, setShowTranslation] = useState(false);
  const dataLength = fetchSentencesToReview.data?.length ?? 0;
  const sentencesToReview = fetchSentencesToReview.data ?? [];

  const currentSentence =
    dataLength > 0 ? sentencesToReview[(currentPage - 1) * rowsPerPage] : null;

  const handleNext = () => {
    if (currentPage < Math.ceil(dataLength / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(1);
    }
    setShowTranslation(false);
  };

  const handleYes = async () => {
    if (!currentSentence) return;
    console.log(currentSentence);
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

    const now = new Date().getTime();
    const intervalInMilliseconds =
      currentSentence.interval * 24 * 60 * 60 * 1000;
    const nextReviewDate = new Date(now + intervalInMilliseconds);
    currentSentence.nextReview = nextReviewDate;

    updateSentence.mutate({
      ...currentSentence,
    });

    handleNext();
  };

  const handleNo = async () => {
    if (!currentSentence) return;
    console.log(currentSentence);
    currentSentence.repetitions = 0;
    currentSentence.fator = 2.5;
    currentSentence.interval = 1;

    const now = new Date().getTime();
    currentSentence.nextReview = new Date(now + 1);

    updateSentence.mutate({
      ...currentSentence,
    });

    handleNext();
  };

  const handleShowTranslation = () => {
    setShowTranslation(true);
  };

  return (
    <div>
      {!currentSentence ? (
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
