-- CreateEnum
CREATE TYPE "TypeVocabulary" AS ENUM ('Unknown', 'Noun', 'Verb', 'Adjective', 'Adverb', 'PhrasalVerb');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateTable
CREATE TABLE "Vocabularies" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "TypeVocabulary" NOT NULL DEFAULT 'Unknown',
    "difficulty" "Difficulty" NOT NULL DEFAULT 'MEDIUM',
    "userId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vocabularies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sentences" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "translation" TEXT NOT NULL,
    "vocabularyId" TEXT,
    "nextReview" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "interval" INTEGER NOT NULL DEFAULT 1,
    "repetitions" INTEGER NOT NULL DEFAULT 0,
    "fator" DOUBLE PRECISION NOT NULL DEFAULT 2.5,

    CONSTRAINT "sentences_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Vocabularies" ADD CONSTRAINT "Vocabularies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sentences" ADD CONSTRAINT "sentences_vocabularyId_fkey" FOREIGN KEY ("vocabularyId") REFERENCES "Vocabularies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
