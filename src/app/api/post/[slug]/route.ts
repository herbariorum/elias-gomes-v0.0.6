// src/app/api/post/[slug]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request, { params}: {params: { slug: string }}) {
    // Acesse o slug diretamente, pois o Next.js já resolveu o valor
    const { slug } = await params;
 
    if (!slug || slug === 'post'){
        return NextResponse.json({ error: 'Slug não fornecido' }, { status: 400 });
    }

    try {
        const post = await prisma.post.findUnique({
            where: { slug },
            select: {
                id: true,
                authorId: true,
                title: true,
                slug: true,
                content: true,
                createdAt: true,
                images: true,
            },
        });

        if (!post) {
            return NextResponse.json({ error: 'Post não encontrado' }, { status: 404 });
        }

        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao buscar o post' }, { status: 500 });
    }
}