import type { SentenceProps } from "@/@types/sentence-chat";
import type { UserSessionProps } from "@/@types/user-session";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import type { NextRequestWithAuth } from "next-auth/middleware";
import { type NextRequest, NextResponse } from "next/server";

interface RequestProps {
  word: string;
  sentences: SentenceProps[];
}

export async function POST(req: NextRequestWithAuth) {
  const { word, sentences } = (await req.json()) as RequestProps;
  const session = await getServerSession(authOptions);
  const user = session?.user as UserSessionProps;

  const wordCreated = await prisma.word.create({
    data: {
      description: word,
      userId: user.id,
    },
  });

  const mapSentences = sentences.map((s) => {
    return {
      description: s.frase,
      translation: s.traducao,
      wordId: wordCreated.id,
    };
  });

  await prisma.sentence.createMany({
    data: [...mapSentences],
  });

  return NextResponse.json(
    { message: "Palavra criada com sucesso" },
    { status: 201 },
  );
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user as UserSessionProps;

  const words = await prisma.word.findMany({
    where: {
      userId: user.id,
    },
    include: {
      sentences: true,
    },
  });

  return NextResponse.json({ data: words });
}
