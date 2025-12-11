// src/components/SearchNav.jsx
import { useEffect, useState, useRef } from "react";

export default function SearchNav() {
  const [keyword, setKeyword] = useState("");
  const [juduls, setJuduls] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);

  // 1. Fetch data dari endpoint Astro yang kita buat tadi
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/films.json"); // Panggil API internal
        if (res.ok) {
          const data = await res.json();
          setJuduls(data);
        }
      } catch (err) {
        console.error("Gagal load data", err);
      }
    };
    fetchData();
  }, []); // Dependency array kosong = jalan sekali saat mount

  // 2. Filter logic (Client side filtering)
  const filteredFilms = keyword === "" ? [] : juduls.filter((item) => item.judul?.toLowerCase().includes(keyword.toLowerCase()));

  // 3. Menutup dropdown jika klik di luar
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  return (
    <div className="relative" ref={wrapperRef}>
      <form action="/search" method="GET" className="relative group">
        <input
          type="text"
          name="query"
          id="query"
          autoComplete="off"
          placeholder="Cari data film..."
          className="text-white bg-bg-btm/30 border border-white/10 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:border-bg-top w-48 transition-all focus:w-48 lg:focus:w-64 pr-8 placeholder-white"
          value={keyword}
          onFocus={() => setShowDropdown(true)}
          onChange={(e) => {
            setKeyword(e.target.value);
            setShowDropdown(true);
          }}
        />

        {/* Tombol Icon Search */}
        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
          <svg className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </form>

      {/* DROPDOWN HASIL PENCARIAN */}
      {showDropdown && keyword && (
        <div className="absolute top-full left-0 w-full mt-2 bg-gray-900 border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
          {filteredFilms.length > 0 ? (
            <ul className="max-h-60 overflow-y-auto">
              {filteredFilms.slice(0, 8).map((film, index) => (
                <li key={index}>
                  <a href={`/search?query=${encodeURIComponent(film.judul)}`} className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors" onClick={() => setKeyword(film.judul)}>
                    {film.judul}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500 text-center">Tidak ditemukan</div>
          )}
        </div>
      )}
    </div>
  );
}
