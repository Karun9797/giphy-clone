import { GiphyFetch } from "@giphy/js-fetch-api";
import { createContext, useContext, useEffect, useState } from "react";

export const GiffContext = createContext();

const GiffProvider = ({ children }) => {
  const [giffs, setGiffs] = useState([]);
  const [filter, setFilter] = useState("gifs");
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (id) => {
    if (favorites.includes(id)) {
      const updatedFavorites = favorites.filter((itemID) => itemID !== id);
      localStorage.setItem("favoritesGiffs", JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    } else {
      const updatedFavorites = [...favorites];
      updatedFavorites.push(id);
      localStorage.setItem("favoritesGiffs", JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    }
  };

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favoritesGiffs")) || [];
    setFavorites(favorites);
  }, []);

  const giffKey = new GiphyFetch(import.meta.env.VITE_GIPHY_API_KEY);
  return (
    <>
      <GiffContext.Provider
        value={{
          giffKey,
          giffs,
          setGiffs,
          filter,
          setFilter,
          favorites,
          addToFavorites,
        }}
      >
        {children}
      </GiffContext.Provider>
    </>
  );
};

export const GiffState = () => {
  return useContext(GiffContext);
};
export default GiffProvider;
