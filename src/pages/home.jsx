import { useEffect } from "react";
import { GiffState } from "../context/GiffContext";
import Giff from "../components/Giff";
import FilterGiff from "../components/FilterGiff";

const HomePage = () => {
  const { giffKey, giffs, setGiffs, filter } = GiffState();

  const fetchTrendingGiffs = async () => {
    const { data } = await giffKey.trending({
      limit: 25,
      rating: "g",
      type: filter,
    });
    setGiffs(data);
  };

  useEffect(() => {
    fetchTrendingGiffs();
  }, [filter]);

  return (
    <div>
      <img
        src="/banner.gif"
        alt="earth banner"
        className="mt-4 mb-4 rounded w-full "
      />

      <FilterGiff showTrending={true} />

      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-3">
        {giffs.map((giff) => (
          <Giff key={giff?.id} giff={giff} />
        ))}
      </div>
    </div>
  );
};
export default HomePage;
