import { prisma } from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    return NextResponse.json(
      { error: "Já existe um usuário com esse email!" },
      { status: 409 },
    );
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });

  return NextResponse.json(
    { message: "Usuário criado com sucesso" },
    { status: 201 },
  );
}
