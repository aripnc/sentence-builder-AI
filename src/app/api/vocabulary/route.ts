import type { SentenceChatProps } from "@/@types/sentence-chat";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

type TypeVocabulary =
  | "Unknown"
  | "PhrasalVerb"
  | "Noun"
  | "Verb"
  | "Adjective"
  | "Adverb";

interface RequestProps {
  vocabulary: string;
  tipo: TypeVocabulary;
  sentences: SentenceChatProps[];
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const { vocabulary, tipo, sentences } = (await req.json()) as RequestProps;
  const user = session?.user;

  if (user) {
    const vocabularyCreated = await prisma.vocabulary.create({
      data: {
        description: vocabulary,
        type: tipo,
        userId: user.id,
      },
    });

    const mapSentences = sentences.map((s) => {
      return {
        description: s.frase,
        translation: s.traducao,
        vocabularyId: vocabularyCreated.id,
      };
    });

    await prisma.sentence.createMany({
      data: [...mapSentences],
    });
  }

  return NextResponse.json(
    { message: "Vocabulário criada com sucesso" },
    { status: 201 },
  );
}

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (user) {
    const vocabularies = await prisma.vocabulary.findMany({
      where: {
        userId: user.id,
      },
      include: {
        sentences: true,
      },
    });

    return NextResponse.json({ data: vocabularies });
  }
}
