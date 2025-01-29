"use client";

import { useState } from "react";

export default function Header({ header_title, header_description, onSearch }: { header_title: string, header_description: string, onSearch: (query: string) => void; }) {
  const [query, setQuery] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const query = formData.get("search") as string;
    onSearch(query);

  };

  return (
    <div className="bg-gray-700">
      <div className="max-w-4xl mx-auto py-12 text-center">
        <h1 className="mb-6 lg:mb-4 text-white text-4xl lg:text-6xl font-bold">
          {header_title}
        </h1>
        <p className="text-white text-lg lg:text-xl">{header_description}</p>
        <form className="mt-6" onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="search"
            onChange={(e) => setQuery(e.target.value)}
            className="my-2 py-4 px-6 rounded-xl" 
            placeholder="Termo de pesquisa" />
          <button type="submit" className="my-2 py-4 px-6 ml-2 rounded-xl bg-sky-700 hover:bg-sky-900 transition text-white font-bold">Pesquisar</button>
        </form>
      </div>
    </div>

  );
}
