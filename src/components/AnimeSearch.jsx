import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AnimeSearch = ({ onAdd, activeTab }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim().length > 2) {
        searchAnime(query);
      } else {
        setResults([]);
      }
    }, 500); // debounce

    return () => clearTimeout(timer);
  }, [query]);

  const searchAnime = async (searchQuery) => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime?q=${searchQuery}&limit=8`);
      const data = await res.json();
      if (data && data.data) {
        setResults(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch anime", err);
    }
    setLoading(false);
  };

  return (
    <div className="w-full">
      <div className="relative mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for an anime..."
          className="w-full bg-[#23252b] text-white p-4 outline-none border border-[#141519] focus:border-[#F47521] transition-colors"
        />
        {loading && (
          <div className="absolute right-4 top-4 text-[#F47521] text-sm animate-pulse font-bold">
            Searching...
          </div>
        )}
      </div>

      {results.length > 0 && (
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {results.map((anime) => (
            <div key={anime.mal_id} className="bg-[#141519] flex flex-col group relative overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(244,117,33,0.3)] cursor-pointer">
              <div className="relative pb-[140%]">
                <img 
                  src={anime.images?.jpg?.image_url || anime.images?.webp?.image_url} 
                  alt={anime.title} 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141519] via-transparent to-transparent opacity-90"></div>
                <div className="absolute bottom-0 left-0 p-3 w-full translate-y-2 group-hover:translate-y-0 transition-transform">
                  <h4 className="text-white font-bold text-sm line-clamp-2 leading-tight">{anime.title}</h4>
                  <p className="text-[#F47521] text-xs mt-1">{anime.year || "N/A"} • {anime.type || "TV"}</p>
                </div>
              </div>
              <div className="p-3 bg-[#141519] mt-auto">
                <button
                  onClick={() => onAdd({
                    id: anime.mal_id,
                    title: anime.title,
                    image: anime.images?.jpg?.image_url,
                    year: anime.year,
                    type: anime.type
                  })}
                  className="w-full bg-[#F47521] text-white font-bold text-xs py-2 uppercase tracking-wide hover:bg-[#d95f36] transition-colors"
                >
                  {activeTab === "watched" ? "+ ADD TO WATCHED" : "+ SUGGEST TO ME"} 
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default AnimeSearch;
