import { GiphyFetch } from "@giphy/js-fetch-api";
import { createContext, useContext, useState } from "react";

export const GiffContext = createContext();

const GiffProvider = ({ children }) => {
  const [giffs, setGiffs] = useState([]);
  const [filter, setFilter] = useState("gifs");
  const [favorites, setFavorites] = useState([]);

  const giffKey = new GiphyFetch(import.meta.env.VITE_GIPHY_API_KEY);
  return (
    <>
      <GiffContext.Provider
        value={{ giffKey, giffs, setGiffs, filter, setFilter, favorites }}
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
