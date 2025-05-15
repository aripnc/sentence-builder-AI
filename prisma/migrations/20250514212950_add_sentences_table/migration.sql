-- CreateTable
CREATE TABLE "sentences" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "translation" TEXT NOT NULL,
    "wordId" TEXT,

    CONSTRAINT "sentences_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sentences" ADD CONSTRAINT "sentences_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "words"("id") ON DELETE SET NULL ON UPDATE CASCADE;
