import React, { useState } from "react";
import { HiEllipsisVertical, HiMiniBars3BottomLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);

  return (
    <nav>
      <div className="relative flex justify-between items-center mb-2">
        <Link to="/" className="flex gap-4">
          <img src="/logo.svg" alt="giphy logo" className="w-8" />
          <h1 className="text-5xl font-bold tracking-tight cursor-pointer">
            GIPHY
          </h1>
        </Link>
        <Link className="px-4 py-1 hover:gradient border-b-4 hidden lg:block">
          Nav bar
        </Link>

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

          <div className="h-10 leading-9 bg-gray-700 px-6 cursor-pointer rounded ">
            <Link to="/favorites">Favorites GIFs</Link>
          </div>
          <button className="text-sky-400 block lg:hidden ">
            <HiMiniBars3BottomLeft size={20} />
          </button>
        </div>
        {showCategories && (
          <div className="absolute w-full top-18 gradient px-20 py-10 right-0">
            <span>Categories</span>
            <hr />
            <div>
              <Link className="font-bold">Reactions</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
