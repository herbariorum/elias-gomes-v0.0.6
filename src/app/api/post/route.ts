
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
    
    const { searchParams } = new URL(req.url)
    console.log(searchParams.get("query"))
    const query = searchParams.get("query");

    try {
        const posts = await prisma.post.findMany({
            where: query ? {
                title: {
                    contains: query,
                    mode: "insensitive",
                }
            } : undefined,
            select: {
                id: true,
                title: true,
                slug: true,
                createdAt: true,
                main_image: true,
            },
        });
        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar os posts" }, { status: 500 });
    }
}

