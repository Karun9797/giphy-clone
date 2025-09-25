import React, { useEffect, useState } from "react";
import { GiffState } from "../context/GiffContext";
import Giff from "../components/Giff";

const Favorites = () => {
  const [favoritesGiff, setFavoritesGiff] = useState([]);
  const { giffKey, favorites } = GiffState();

  const fetchFavoritesGiffs = async () => {
    const { data } = await giffKey.gifs(favorites);
    setFavoritesGiff(data);
  };

  useEffect(() => {
    fetchFavoritesGiffs();
  }, []);

  return (
    <div className="mt-2">
      <span className="faded-text ">My Favorites</span>
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 mt-2">
        {favoritesGiff.map((giff) => (
          <Giff giff={giff} key={giff.id} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
