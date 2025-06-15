"use client";

import { Button } from "@/components/ui/button";
import { FetchSentences } from "@/http/sentences/fetch-sentences";
import { useQuery } from "@tanstack/react-query";
import { Eye, Frown, Smile } from "lucide-react";
import { useState } from "react";

export default function Review() {
  const { data: sentences = [], isLoading } = useQuery({
    queryKey: ["sentences"],
    queryFn: FetchSentences,
  });

  const rowsPerPage = 1;
  const [currentPage, setCurrentPage] = useState(1);
  const [showTranslation, setShowTranslation] = useState(false);

  const currentSentence = sentences[(currentPage - 1) * rowsPerPage];

  const handleNext = () => {
    if (currentPage < Math.ceil(sentences.length / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(1);
    }
    setShowTranslation(false);
  };

  const handleYes = () => {
    handleNext();
  };

  const handleNo = () => {
    handleNext();
  };

  const handleShowTranslation = () => {
    setShowTranslation(true);
  };

  return (
    <div className="flex flex-col mt-28 space-y-28 items-center  justify-center">
      <div className="space-y-4">
        <div className="flex flex-col space-y-3 items-center">
          <Button onClick={handleShowTranslation} variant="outline" size="sm">
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
  );
}
