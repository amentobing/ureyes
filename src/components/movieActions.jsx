import { useState } from "react";

export default function MovieActions({ initialSaved = false, initialLiked = false, userID, filmID }) {
  const [saved, setSaved] = useState(initialSaved);
  const [liked, setLiked] = useState(initialLiked);

  const handleSave = async () => {
    const newState = !saved;
    setSaved(newState);

    if (newState) {
      // console.log("Film ditambahkan ke daftar putar");
      await fetch(`/api/addPlaylist?userID=${userID}&filmID=${filmID}`);
    } else {
      // console.log("Film dihapus dari daftar putar");
      await fetch(`/api/rmPlaylist?userID=${userID}&filmID=${filmID}`);
    }
  };

  const handleLike = async () => {
    const newState = !liked;
    setLiked(newState);

    if (newState) {
      // console.log("Film disukai");
      await fetch(`/api/addLike?userID=${userID}&filmID=${filmID}`);
    } else {
      // console.log("Batal menyukai film");
      await fetch(`/api/rmLike?userID=${userID}&filmID=${filmID}`);
    }
  };

  return (
    <div className="flex gap-4">
      {/* Tombol Tambah ke Daftar */}
      <button
        onClick={handleSave}
        className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg duration-300 cursor-pointer ${
          saved ? "bg-bg-btm hover:bg-bg-btm/70 text-white shadow-green-900/20" : "bg-btn hover:bg-btn-hover text-white shadow-brand-bg-top/20"
        }`}
      >
        {saved ? (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Tersimpan
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Tambah ke Daftar
          </>
        )}
      </button>

      {/* Tombol Suka */}
      <button
        onClick={handleLike}
        className={`px-6 py-3 rounded-xl font-bold transition-all border flex items-center gap-2 duration-300 cursor-pointer ${liked ? "bg-red-500/20 border-red-500 text-white" : "bg-white/10 hover:bg-white/20 border-white/20 text-white"}`}
      >
        <svg className={`w-5 h-5 transition-colors ${liked ? "text-red-500" : "text-gray-300"}`} fill={liked ? "currentColor" : "currentColor"} viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
        </svg>
        {liked ? "Disukai" : "Suka"}
      </button>
    </div>
  );
}
