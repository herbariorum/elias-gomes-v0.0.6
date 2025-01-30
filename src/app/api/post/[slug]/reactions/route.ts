import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function POST(request: Request, { params }: { params: { slug: string } }) {
    const { slug } = await params;

    try {
        const body = await request.json(); // Lê o corpo da requisição
        const { reaction_type } = body; // Obtém o tipo de reação do corpo

        // Verifica se o tipo de reação é válido
        if (reaction_type !== 'like' && reaction_type !== 'dislike') {
            return NextResponse.json({ error: 'Tipo de reação inválido' }, { status: 400 });
        }

        // Encontra o post pelo slug
        const post = await prisma.post.findUnique({
            where: { slug },
            include: {
                reactions: true, // Inclui as reações relacionadas
            }
        });

        if (!post) {
            return NextResponse.json({ error: 'Post não encontrado' }, { status: 404 });
        }

        // Adiciona a nova reação
        await prisma.reactions.create({
            data: {
                reaction_type,
                postId: post.id,
                userId: 1, // Substitua pelo ID do usuário autenticado
            },
        });

        // Atualiza as reações
        const updatedPost = await prisma.post.findUnique({
            where: { slug },
            include: {
                reactions: true,
            }
        });

        const likes = updatedPost?.reactions.filter(r => r.reaction_type === 'like').length;
        const dislikes = updatedPost?.reactions.filter(r => r.reaction_type === 'dislike').length;
        
        return NextResponse.json({ likes, dislikes });
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao processar a reação' }, { status: 500 }
        );
    }
}

export async function GET(req: Request, { params}: {params: { slug: string }}) {
    
    const { slug } = await params;   
    
    try {
        const posts = await prisma.post.findUnique({
            where: {slug},
            include: {
                reactions: true,
            }           
        });
        if (!posts) {
            return NextResponse.json({ error: 'Post não encontrado'}, {status: 404});
        }
        const likes = posts.reactions.filter(r => r.reaction_type === 'like').length;
        const dislikes = posts.reactions.filter(r => r.reaction_type === 'dislike').length;

        return NextResponse.json({likes, dislikes});
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar os posts" }, { status: 500 });
    }
}