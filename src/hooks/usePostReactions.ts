import { useEffect, useState } from "react";


interface ReactionsType {
    likes: number;
    dislikes: number;
}

export default function usePostReactions({ slug }: { slug: string }) {

    const [reactions, setReactions] = useState<ReactionsType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchReactions = async () => {
        if (slug && slug.length > 0){
            try {
                const response = await fetch(`/api/post/${slug}/reactions`);
                if (!response.ok){
                    throw new Error('Erro ao processar a reação');
                }
                const data = await response.json();
                
                setReactions(data);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Erro ao processar a reação');
            } finally {
                setLoading(false);
            }
        }
    }
    const handleReaction = async (reactionType: 'like' | 'dislike') => {       
        try {
            const response = await fetch(`/api/post/${slug}/reactions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ reaction_type: reactionType }),
            });

            if (!response.ok) {
                throw new Error('Erro ao processar a reação');
            }
           
            await fetchReactions();
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Erro ao processar a reação');
        } 
    };
    useEffect(() => {
        fetchReactions();
    }, [slug]);


    return { handleReaction, reactions, loading, error }
}