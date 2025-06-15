import type { SentenceChatProps } from "@/@types/sentence-chat";
import { prisma } from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";

type RequestProps = {
  sentences: SentenceChatProps[];
  vocabularyId: string;
};

export async function POST(req: NextRequest) {
  const { sentences, vocabularyId } = (await req.json()) as RequestProps;

  const mappedSentences = sentences.map((s) => {
    return {
      description: s.frase,
      translation: s.traducao,
      vocabularyId: vocabularyId,
    };
  });

  await prisma.sentence.createMany({
    data: [...mappedSentences],
  });

  return NextResponse.json({ status: 201 });
}

export async function GET(req: NextRequest) {
  const data = await prisma.sentence.findMany({
    where: {
      nextReview: {
        lte: new Date(),
      },
    },
    // take: 10
  });

  return NextResponse.json({ data });
}
