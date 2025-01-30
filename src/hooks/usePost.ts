'use client'
import { useState, useEffect } from "react";


interface PostType {
    id: number;
    authorId: number;
    title: string;
    slug: string;
    content: string | null;
    createdAt: Date;
    images: string[];
}


export default function usePost({ slug }: { slug: string }) {
    const [post, setPost] = useState<PostType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (slug && slug.length > 0){
            fetch(`/api/post/${slug}`)
            .then(resposta => resposta.json())
            .then(dados => {                
                setPost(dados);
            })
            .catch(error => {
                setError(error instanceof Error ? error.message: 'Erro ao carregar o post')
            })
            .finally(() => {
                setLoading(false);
            })
        }
        
    }, [slug]);

    return { post, loading, error}
}