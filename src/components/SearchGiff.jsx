import { useState } from "react";
import { HiMiniXMark, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const SearchGiff = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const searchGiffs = async () => {
    if (query.trim() === "") {
      return;
    }
    navigate(`/search/${query}`);
  };

  return (
    <>
      <div className="flex relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search giffs and stickers"
          className="w-full pl-4 pr-14 py-5 bg-white text-black rounded-sm outline-teal-600"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              navigate("/");
            }}
            className="absolute right-20 bg-gray-300 hover:bg-gray-400 rounded-full top-5 cursor-pointer mr-2"
          >
            <HiMiniXMark size={22} />
          </button>
        )}
        <button
          onClick={searchGiffs}
          className="bg-gradient-to-tr from-pink-600 to-pink-400 text-white px-4 py-2 rounded-tr rounded-br cursor-pointer"
        >
          <HiOutlineMagnifyingGlass size={35} className="scale-x-100" />
        </button>
      </div>
    </>
  );
};

export default SearchGiff;
