import React, { useContext, useEffect, useState } from "react";
import { HiEllipsisVertical, HiMiniBars3BottomLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { GiffContext, GiffState } from "../context/GiffContext";
import SearchGiff from "./SearchGiff";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const { giffKey, giffs, setGiffs, filter, setFilter, favorites } =
    GiffState();
  const fetchCategories = async () => {
    try {
      const { data } = await giffKey.categories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  useEffect(() => {
    fetchCategories();
  });
  return (
    <nav>
      <div className="relative flex justify-between items-center mb-2">
        <Link to="/" className="flex gap-4">
          <img src="/logo.svg" alt="giphy logo" className="w-8" />
          <h1 className="text-5xl font-bold tracking-tight cursor-pointer">
            GIPHY
          </h1>
        </Link>
        <div className="flex gap-2 font-semibold items-center">
          {categories?.slice(0, 5)?.map((category) => (
            <Link
              key={category.name}
              className="px-4 py-1 hover:gradient border-b-4 hidden lg:block"
              to={`/${category.name_encoded}`}
            >
              {category.name}
            </Link>
          ))}
        </div>

        {/* show categories */}
        <div className="flex justify-between items-center gap-2">
          <Link className="px-4 py-1 hover:gradient border-b-4 hidden lg:block">
            Reactions
          </Link>
          <button
            onClick={() => setShowCategories(!showCategories)}
            className={`p-2 hover:gradient ${
              showCategories ? "gradient" : ""
            } border-b-4 hidden lg:block`}
          >
            <HiEllipsisVertical size={20} />
          </button>

          {favorites.length > 0 && (
            <div className="h-10 leading-9 bg-gray-700 px-6 cursor-pointer rounded ">
              <Link to="/favorites">Favorites GIFs</Link>
            </div>
          )}
          <button className="text-sky-400 block lg:hidden ">
            <HiMiniBars3BottomLeft size={20} />
          </button>
        </div>
        {showCategories && (
          <div className="absolute w-full rounded-sm top-14 gradient px-20 py-10 right-0 z-100">
            <span className="text-3xl font-extrabold">Categories</span>
            <hr className="bg-gray-100 opacity-50 my-5" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
              {categories?.map((category) => (
                <Link
                  key={category.name}
                  className="font-bold"
                  to={`/${category.name_encoded}`}
                  onClick={() => setShowCategories(!showCategories)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <SearchGiff />
    </nav>
  );
};

export default Header;
