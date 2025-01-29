"use client"
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { HomeCard } from "@/components/HomeCard";
import { useEffect, useState } from "react";

export interface PostCardType {
  id: number;
  title: string;
  slug: string;
  createdAt: Date;
  main_image: string;
}


const fetchPosts = async (query?: string): Promise<PostCardType[]> => {
  const response = await fetch(`/api/post?query=${query || ""}`, {
    method: "GET",
  });
  if (!response.ok){
    throw new Error("Erro ao buscar os posts.");  
  }
  return response.json();
}

export default function Home() {
  const [posts, setPosts] = useState<PostCardType[]>([]);

  useEffect(() => {
    const fetchInitialPosts = async () => {
      const initialPosts = await fetchPosts();
      setPosts(initialPosts);
    };
    fetchInitialPosts();
  }, []);

  const handleSearch = async (query: string) => {
    const posts = await fetchPosts(query);
    setPosts(posts);
  }

  return (
    <>
      <Header header_title="Fitologia" header_description="Estudo dos Vegetais" onSearch={handleSearch} />
      <div className="grid md:grid-cols-3 gap-0 justify-center w-full">
        {posts.map(post => (
          <HomeCard post={post} key={post.id} />        
        ))}
      </div>
      <Footer />
    </>
  );
}
