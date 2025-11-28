import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  User,
  ChevronDown,
  Search,
  Landmark
} from "lucide-react";
import logo from "../assets/logo.png";

import { LanguageContext } from "../context/LanguageContext";
import useTranslate from "../hooks/useTranslateNav";

// Hard-coded search data
const searchList = [
  {
    id: "691e8914ed0bb3a992661e56",
    name: "Netarhat Hills",
    link: "/details/691e8914ed0bb3a992661e56",
  },
  {
    id: "691e8914ed0bb3a992661e58",
    name: "Betla National Park",
    link: "/details/691e8914ed0bb3a992661e58",
  },
  {
    id: "691e8914ed0bb3a992661e59",
    name: "Hundru Falls",
    link: "/details/691e8914ed0bb3a992661e59",
  },
  {
    id: "691e8914ed0bb3a992661e57",
    name: "Patratu Valley",
    link: "/details/691e8914ed0bb3a992661e57",
  },
];


function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const { lang, setLang } = useContext(LanguageContext);

  const savedUser = JSON.parse(localStorage.getItem("user"));
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [query, setQuery] = useState("");
const [results, setResults] = useState([]);


  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.reload();
  };

  const linkClasses = (path) =>
    `flex items-center ${
      location.pathname === path
        ? "text-green-600 font-semibold"
        : "hover:text-green-600"
    }`;
  const tCulture = useTranslate("Culture", lang);
  const tLogin = useTranslate("Login", lang);
  const tLogout = useTranslate("Logout", lang);
  const tAdminPanel = useTranslate("Admin Panel", lang);
  const tSearch = useTranslate("Search...", lang);

  const handleSearch = (value) => {
  setQuery(value);

  if (value.trim() === "") {
    setResults([]);
    return;
  }

  const filtered = searchList.filter((item) =>
    item.name.toLowerCase().includes(value.toLowerCase())
  );

  setResults(filtered);
};


  return (
    <nav className="relative shadow-sm py-4 px-6 md:px-10 flex items-center justify-between z-50 text-xl">
      <Link to="/" className="flex items-center">
        <img
          src={logo}
          alt="Smart Tourism Jharkhand"
          className="h-10 object-contain cursor-pointer"
        />
      </Link>

      {/* Search + Language */}
      <div className="hidden md:flex items-center space-x-3 flex-1 justify-center">
        <div className="relative w-96">
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={tSearch}
            className="w-full px-4 py-2 pr-10 border rounded-full text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <Search
            size={20}
            className="absolute right-3 top-1/4 -translate-y-1/2 text-gray-500 pointer-events-none"
          />
          {results.length > 0 && (
  <div className="absolute bg-white w-full shadow-lg rounded-xl mt-2 z-50 max-h-60 overflow-y-auto text-black">
    {results.map((item) => (
      <Link
        key={item.id}
        to={item.link}
        className="block px-4 py-2 hover:bg-gray-100"
        onClick={() => {
          setQuery("");
          setResults([]);
        }}
      >
        {item.name}
      </Link>
    ))}
  </div>
)}

        </div>

        <div className="relative">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="px-4 py-2 border rounded-full shadow-sm bg-white hover:bg-gray-100 flex items-center gap-2 text-gray-800 font-semibold"
          >
            {lang === "en" ? "English" : lang === "hi" ? "Hindi" : lang=== "bn" ? "Bengali" : "Marathi"}
            <ChevronDown
              size={18}
              className={`transition-transform duration-200 ${
                langOpen ? "rotate-180" : ""
              } hover:text-green-600`}
            />
          </button>

          {langOpen && (
            <div className="absolute top-12 right-0 w-48 bg-white rounded-2xl shadow-xl py-3 z-50 animate-fadeIn">
              {["en", "hi", "bn", "mr"].map((code) => (
                <div
                  key={code}
                  onClick={() => {
                    setLang(code);
                    setLangOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                >
                  {code === "en"
                    ? "English"
                    : code === "hi"
                    ? "Hindi"
                    : code === "bn"
                    ? "Bengali"
                    : "Marathi"}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-8">
        {!savedUser ? (
          <Link to="/login" className={linkClasses("/login")+"font-bold"}>
            {tLogin}
          </Link>
        ) : (
          <div className="relative flex items-center cursor-pointer">
            <button
              className="hover:text-green-600 font-semibold flex items-center"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <User size={18} className="mr-1" />
              {savedUser.name}
            </button>

            {dropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                {savedUser.isAdmin && (
                  <Link
                    to="/admin"
                    className="block w-full text-left px-3 py-2 font-semibold hover:bg-gray-100"
                  >
                    {tAdminPanel}
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 font-semibold hover:bg-gray-100"
                >
                  {tLogout} ({savedUser.name})
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-gray-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                mobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg flex flex-col p-4 space-y-4 z-50 animate-slideDown text-black">
          ```
          {/* Search */}
          <div className="relative w-full">
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder={tSearch}
              className="w-full px-4 py-2 pr-10 border rounded-full text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <Search
              size={20}
              className="absolute right-3 top-1/3 -translate-y-1/2 text-gray-500 pointer-events-none"
            />
            {results.length > 0 && (
  <div className="bg-white w-full shadow-lg rounded-xl mt-2 z-50 max-h-60 overflow-y-auto">
    {results.map((item) => (
      <Link
        key={item.id}
        to={item.link}
        onClick={() => {
          setMobileMenuOpen(false);
          setQuery("");
          setResults([]);
        }}
        className="block px-4 py-2 hover:bg-gray-100"
      >
        {item.name}
      </Link>
    ))}
  </div>
)}

          </div>
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="w-full px-4 py-2 border rounded-full shadow-sm bg-white hover:bg-gray-100 flex items-center justify-between text-gray-800 font-semibold"
            >
              {lang === "en" ? "English" : lang === "hi" ? "Hindi" : lang}
              <ChevronDown
                size={18}
                className={`transition-transform duration-200 ${
                  langOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {langOpen && (
              <div className="absolute top-12 left-0 w-full bg-white rounded-2xl shadow-xl py-3 z-50 animate-fadeIn">
                {["en", "hi", "bn", "mr"].map((code) => (
                  <div
                    key={code}
                    onClick={() => {
                      setLang(code);
                      setLangOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                  >
                    {code === "en"
                      ? "English"
                      : code === "hi"
                      ? "Hindi"
                      : code === "bn"
                      ? "Bengali"
                      : "Marathi"}
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Navigation Links */}
          {savedUser?.isAdmin && (
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className={linkClasses("/admin") + " font-semibold"}
            >
              {tAdminPanel}
            </Link>
          )}
          {!savedUser ? (
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className={linkClasses("/login")+"font-bold"}
            >
              {tLogin}
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="text-left px-3 py-2 font-semibold hover:bg-gray-100"
            >
              {tLogout} ({savedUser.name})
            </button>
          )}
          ```
        </div>
      )}
    </nav>
  );
}

export default Navbar;
