/*
  Warnings:

  - You are about to drop the `Vocabularys` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Vocabularys" DROP CONSTRAINT "Vocabularys_userId_fkey";

-- DropForeignKey
ALTER TABLE "sentences" DROP CONSTRAINT "sentences_vocabularyId_fkey";

-- DropTable
DROP TABLE "Vocabularys";

-- CreateTable
CREATE TABLE "Vocabularies" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "TypeVocabulary" NOT NULL DEFAULT 'Unknown',
    "difficulty" "Difficulty" NOT NULL DEFAULT 'MEDIUM',
    "userId" TEXT,

    CONSTRAINT "Vocabularies_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Vocabularies" ADD CONSTRAINT "Vocabularies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sentences" ADD CONSTRAINT "sentences_vocabularyId_fkey" FOREIGN KEY ("vocabularyId") REFERENCES "Vocabularies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
