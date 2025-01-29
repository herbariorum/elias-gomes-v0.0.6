import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { postId, reactionType } = await req.json();

    if (!postId || !reactionType) {
      return NextResponse.json(
        { error: "postId e reactionType são obrigatórios." },
        { status: 400 }
      );
    }

    await prisma.reactions.create({
      data: {
        postId: postId,
        reaction_type: reactionType,
      },
    });

    return NextResponse.json({ message: "Reação registrada com sucesso." });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao registrar a reação." },
      { status: 500 }
    );
  }
}


export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");

    if (!postId) {
      return NextResponse.json(
        { error: "postId é obrigatório." },
        { status: 400 }
      );
    }

    const reactions = await prisma.reactions.groupBy({
      by: ["reaction_type"],
      _count: true,
      where: {
        postId: parseInt(postId, 10),
      },
    });

    const likes = reactions.find((r) => r.reaction_type === "like")?._count || 0;
    const dislikes =
      reactions.find((r) => r.reaction_type === "dislike")?._count || 0;

    return NextResponse.json({ likes, dislikes });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao obter as reações." },
      { status: 500 }
    );
  }
}