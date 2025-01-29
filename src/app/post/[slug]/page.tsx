
import Footer from "@/components/Footer";
import prisma from "@/lib/prisma";
import { PostDescription } from "@/components/PostDescription";

import SwiperComponent from "@/components/SwipperComponent";
import { notFound } from "next/navigation";


interface PostType {
    id: number;
    title: string;
    slug: string;
    content: string | null;
    createdAt: Date;
    images: string[];
}

interface Props {
    params: {
        slug: string;
    }
}

const fetchPosts = async (slug: string): Promise<PostType> => {
    const post = await prisma.post.findUnique({
        where: {
            slug: slug,
        },

        select: {
            id: true,
            title: true,
            slug: true,
            content: true,
            createdAt: true,
            images: true,
        }
    });

    if (!post) {
        notFound();
    }

    return post;
}

export default async function DetailPost({ params }: Props) {
    const placeholder = 'https://placehold.co/600x400.png';

    try {


        const { slug } = await params;
        const post = await fetchPosts(slug);


        return (
            <>
                <div className="bg-white">
                    <a href="/" className="inline-flex items-center justify-center p-5 text-base font-medium text-gray-500  bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" d="M5 12h14M5 12l4-4m-4 4 4 4" />
                        </svg>
                        <span className="w-full">Volta ao início</span>
                    </a>
                </div>

                <PostDescription description={post.content ?? ''} postId={post.id} />

                <div className="mb-20 bg-white">
                    <SwiperComponent images={post.images} />
                </div>

                <Footer />
            </>

        );
    } catch (error) {
        notFound();
    }
}