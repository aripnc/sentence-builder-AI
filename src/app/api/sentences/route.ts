import type { SentenceChatProps } from "@/@types/sentence-chat";
import type { SentenceProps } from "@/@types/vocabulary";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

type PostRequestProps = {
  sentences: SentenceChatProps[];
  vocabularyId: string;
};

export async function POST(req: NextRequest) {
  const { sentences, vocabularyId } = (await req.json()) as PostRequestProps;

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
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const data = await prisma.sentence.findMany({
    where: {
      nextReview: {
        lte: new Date(),
      },
      AND: {
        vocabulary: {
          userId: user.id,
        },
      },
    },
    // take: 10
  });

  return NextResponse.json({ data });
}

type PutRequestProps = {
  sentence: SentenceProps;
};

export async function PUT(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { sentence } = (await req.json()) as PutRequestProps;

  await prisma.sentence.update({
    where: {
      id: sentence.id,
    },
    data: sentence,
  });

  return NextResponse.json({ message: "Sentence atualizada com sucesso!" });
}
