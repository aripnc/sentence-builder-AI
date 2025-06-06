/*
  Warnings:

  - You are about to drop the column `wordId` on the `sentences` table. All the data in the column will be lost.
  - You are about to drop the `words` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TypeVocabulary" AS ENUM ('Unknown', 'Noun', 'Verb', 'Adjective', 'Adverb', 'PhrasalVerb');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- DropForeignKey
ALTER TABLE "sentences" DROP CONSTRAINT "sentences_wordId_fkey";

-- DropForeignKey
ALTER TABLE "words" DROP CONSTRAINT "words_userId_fkey";

-- AlterTable
ALTER TABLE "sentences" DROP COLUMN "wordId",
ADD COLUMN     "vocabularyId" TEXT;

-- DropTable
DROP TABLE "words";

-- CreateTable
CREATE TABLE "Vocabularys" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "TypeVocabulary" NOT NULL DEFAULT 'Unknown',
    "difficulty" "Difficulty" NOT NULL DEFAULT 'MEDIUM',
    "userId" TEXT,

    CONSTRAINT "Vocabularys_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Vocabularys" ADD CONSTRAINT "Vocabularys_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sentences" ADD CONSTRAINT "sentences_vocabularyId_fkey" FOREIGN KEY ("vocabularyId") REFERENCES "Vocabularys"("id") ON DELETE SET NULL ON UPDATE CASCADE;
