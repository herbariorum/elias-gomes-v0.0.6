'use client';
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa6";
import { useState, useEffect } from "react";

export function PostDescription({
  description,
  postId,
}: {
  description: string;
  postId: number; // O ID do post relacionado
}) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  // Utilizando o postId como dependência
  useEffect(() => {
    async function fetchReactions() {
      try {
        const response = await fetch(`/api/reactions?postId=${postId}`);
        if (response.ok) {
          const { likes, dislikes } = await response.json();
          setLikes(likes);
          setDislikes(dislikes);
        } else {
          console.error("Erro ao carregar as reações.");
        }
      } catch (error) {
        console.error("Erro ao buscar reações:", error);
      }
    }

    if (postId) {
      fetchReactions();
    }
  }, [postId]); // Depende apenas de postId

  async function handleClickLike() {
    try {
      const response = await fetch(`/api/reactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, reactionType: "like" }),
      });

      if (response.ok) {
        setLikes(likes + 1);
      } else {
        console.error("Erro ao registrar like.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  }

  async function handleClickDislike() {
    try {
      const response = await fetch(`/api/reactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, reactionType: "dislike" }),
      });

      if (response.ok) {
        setDislikes(dislikes + 1);
      } else {
        console.error("Erro ao registrar dislike.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  }

  return (
    <div className="flex justify-center items-center bg-white">
      <div className="relative max-w-[1160px] w-full px-5 py-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 min-h-[600px]">
          <div className="md:col-span-2 min-h-[600px] md:p-4 p-0 overflow-auto">
            <div dangerouslySetInnerHTML={{ __html: description }} />
            <div className="flex items-center gap-5 px-4 py-2 text-lg text-gray-700 rounded bg-gray-300/50">
              {/* Like Section */}
              <div className="flex items-center gap-2">
                <FaRegThumbsUp
                  onClick={handleClickLike}
                  className="cursor-pointer hover:text-green-600 transition"
                />
                <span>{likes}</span>
              </div>

              {/* Dislike Section */}
              <div className="flex items-center gap-2">
                <FaRegThumbsDown
                  onClick={handleClickDislike}
                  className="cursor-pointer hover:text-red-600 transition"
                />
                <span>{dislikes}</span>
              </div>
            </div>
          </div>

          <div className="hidden md:block min-h-[600px] bg-gray-100 p-5 ml-10 mt-10">
            <h2 className="text-x1 font-semibold mb-4">Neste artigo</h2>
            <ul className="space-y-2">
              <li>
                <a href="#general-description" className="text-blue-500 hover:text-blue-700">
                  Introdução
                </a>
              </li>
              <li>
                <a href="#habitat" className="text-blue-500 hover:text-blue-700">
                  Habitat
                </a>
              </li>
              <li>
                <a href="#size" className="text-blue-500 hover:text-blue-700">
                  Hábito
                </a>
              </li>
              <li>
                <a href="#leaf" className="text-blue-500 hover:text-blue-700">
                  Folhas
                </a>
              </li>
              <li>
                <a href="#inflorescence" className="text-blue-500 hover:text-blue-700">
                  Inflorescência
                </a>
              </li>
              <li>
                <a href="#fruit-and-seeds" className="text-blue-500 hover:text-blue-700">
                  Frutos e Sementes
                </a>
              </li>
              <li>
                <a href="#seen-material" className="text-blue-500 hover:text-blue-700">
                  Material Visto
                </a>
              </li>
              <li>
                <a href="#references" className="text-blue-500 hover:text-blue-700">
                  Referências
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

