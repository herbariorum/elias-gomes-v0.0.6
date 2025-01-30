'use client'

import usePost from '@/hooks/usePost';
import { PostDescription } from './PostDescription';
import SwiperComponent from './SwipperComponent';


interface PostContentProps {
    slug: string;
    userId: number;
}


export default function PostContent({ slug, userId }: PostContentProps) {
    const { post, loading, error } = usePost({ slug });
 
    if (loading){
        return <p>Carregando...</p>
    }
    if (error){
        return <p>{error}</p>
    }
    if (!post) {
        return <p>Post não encontrado</p>
    }

    return (
        <>
            <PostDescription description={post.content ?? ''} slug={post.slug} userId={userId} />
            <div className='mb-20 bg-white'>
                <SwiperComponent images={post.images} />
            </div>
        </>
    )
}