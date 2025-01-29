

import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import Image from "next/image";
import Link from "next/link";

// Definindo a interface para Post e Midia


import { PostCardType } from '@/app/page';

interface Props {
    post: PostCardType
}

export function HomeCard({ post }: Props) {
    const placeholder = 'https://placehold.co/600x400.png';

    return (
        <div className="relative flex flex-col p-6 hover:bg-white shadow-sm border border-slate-200">
            <Link href={`/post/${post.slug}`}>
                <div className="flex flex-col">
                    <div className="flex justify-center items-center overflow-hidden">
                        <Image
                            src={post.main_image ? post.main_image : placeholder}
                            alt={post.main_image}
                            width={768}
                            height={432}
                            priority
                            className="w-full h-72 transform object-cover transition-transform duration-500 hover:scale-105"
                        />
                    </div>
                    <div className="pt-6 font-roboto font-medium text-3xl">
                        {post.title}
                    </div>
                    <div className="pt-16 mb-28 text-zinc-500">
                        {format(new Date(post.createdAt), "dd 'de' MMMM, yyyy", { locale: ptBR })}
                    </div>
                </div>
            </Link>
        </div>
    );
}