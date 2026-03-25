// src/pages/AnimeSection.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AnimeSearch from "../components/AnimeSearch";
import AdminGate from "../components/AdminGate";

const AnimeSection = () => {
  const [activeTab, setActiveTab] = useState("watched"); // 'watched' or 'suggest'
  const [watchedList, setWatchedList] = useState([]);
  const [suggestedList, setSuggestedList] = useState([]);
  const [showAdminGate, setShowAdminGate] = useState(false);
  const [pendingAnime, setPendingAnime] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Load lists from localStorage on mount
    const storedWatched = JSON.parse(localStorage.getItem("anime_watched") || "[]");
    const storedSuggest = JSON.parse(localStorage.getItem("anime_suggested") || "[]");
    setWatchedList(storedWatched);
    setSuggestedList(storedSuggest);
  }, []);

  const saveToStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const handleAddAnime = (anime) => {
    if (activeTab === "watched") {
      if (!isAuthenticated) {
        setPendingAnime(anime);
        setShowAdminGate(true);
      } else {
        addToWatched(anime);
      }
    } else {
      addToSuggested(anime);
    }
  };

  const addToWatched = (anime) => {
    if (!watchedList.find(a => a.id === anime.id)) {
      const newList = [anime, ...watchedList];
      setWatchedList(newList);
      saveToStorage("anime_watched", newList);
    }
    setPendingAnime(null);
  };

  const addToSuggested = (anime) => {
    if (!suggestedList.find(a => a.id === anime.id)) {
      const newList = [anime, ...suggestedList];
      setSuggestedList(newList);
      saveToStorage("anime_suggested", newList);
    }
  };

  const handleAdminSuccess = () => {
    setIsAuthenticated(true);
    setShowAdminGate(false);
    if (pendingAnime) {
      addToWatched(pendingAnime);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#ebebeb] font-sans pt-16">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Anime Tracker</h1>
          <p className="text-gray-400">Discover what I've watched and suggest new adventures.</p>
        </motion.div>

        {/* Tab Navigation (Crunchyroll Style) */}
        <div className="flex space-x-8 border-b border-[#23252b] mb-8">
          <button
            onClick={() => setActiveTab("watched")}
            className={`pb-4 px-2 uppercase tracking-wide font-bold text-sm transition-colors ${
              activeTab === "watched" 
                ? "text-[#F47521] border-b-2 border-[#F47521]" 
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            Animes I Watched
          </button>
          <button
            onClick={() => setActiveTab("suggest")}
            className={`pb-4 px-2 uppercase tracking-wide font-bold text-sm transition-colors ${
              activeTab === "suggest" 
                ? "text-[#F47521] border-b-2 border-[#F47521]" 
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            Suggest Me Animes
          </button>
        </div>

        {/* Search Section */}
        <div className="mb-12">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
            {activeTab === "watched" ? "Add to Watched List" : "Suggest an Anime"}
          </h2>
          <AnimeSearch onAdd={handleAddAnime} activeTab={activeTab} />
        </div>

        {/* List Display */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-[#F47521] pl-3">
            {activeTab === "watched" ? "My Watchlist" : "Community Suggestions"}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {(activeTab === "watched" ? watchedList : suggestedList).map((anime) => (
               <motion.div 
                 key={anime.id} 
                 className="relative group cursor-pointer"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
               >
                  <div className="relative pb-[140%] overflow-hidden bg-[#141519]">
                    <img 
                      src={anime.image} 
                      alt={anime.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="pt-2">
                    <h4 className="text-white font-semibold text-sm line-clamp-2 hover:text-[#F47521] transition-colors">{anime.title}</h4>
                    <p className="text-gray-500 text-xs mt-1">{anime.year || "N/A"}</p>
                  </div>
               </motion.div>
            ))}
            
            {(activeTab === "watched" ? watchedList.length : suggestedList.length) === 0 && (
              <div className="col-span-full py-12 text-center text-gray-500 text-lg">
                No animes here yet! Search above to add one.
              </div>
            )}
          </div>
        </div>
      </main>

      {showAdminGate && (
        <AdminGate 
          onSuccess={handleAdminSuccess} 
          onClose={() => setShowAdminGate(false)} 
        />
      )}
    </div>
  );
};

export default AnimeSection;
