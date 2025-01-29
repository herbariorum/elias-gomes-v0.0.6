"use client"

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type FetchError = {
    message: string;
};

export default function HomeCard() {
    type Post = {
        id: number;
        slug: string;
        titulo: string;
        created_at: string;
        imagem_detalhe: string;
    };

    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('/api/post');
                if (!response.ok){
                    throw new Error('Erro na requisição');
                }
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                const fetchError = error as FetchError; // Aqui
                setError(fetchError.message || 'Erro desconhecido');
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error}</p>
    
    const placeholder = 'https://placehold.co/600x400.png';
   
    return (
        
        <div className="grid grid-cols-3 gap-0 justify-center w-full">
            {posts.map(post => (
                
                <div key={post.id}  className="relative flex flex-col p-6 hover:bg-white shadow-sm border border-slate-200">
                    <Link href={`/post/${post.slug}`}>
                        <div className="flex flex-col">
                            <div className="flex justify-center items-center overflow-hidden">
                                <Image 
                                    src={post.imagem_detalhe ? post.imagem_detalhe : placeholder}
                                    alt={post.slug}
                                    width={768}
                                    height={432}
                                    priority
                                    className="w-full h-72 transform object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </div>
                            <div className="pt-6 font-roboto font-medium text-3xl">
                                {post.titulo}
                            </div>
                            <div className="pt-16 mb-28 text-zinc-500">
                                {format(new Date(post.created_at), "dd 'de' MMMM, yyyy", {locale: ptBR})}                                
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}