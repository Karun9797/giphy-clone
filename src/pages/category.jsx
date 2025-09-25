import { useEffect, useState } from "react";
import { GiffState } from "../context/GiffContext";
import { useParams } from "react-router-dom";
import Giff from "../components/Giff";
import FollowOn from "../components/FollowOn";

const CategoryPage = () => {
  const [results, setResults] = useState([]);
  const { giffKey } = GiffState();
  const { category } = useParams();

  const fetchSearchResults = async () => {
    const { data } = await giffKey.gifs(category, category);
    setResults(data);
  };

  useEffect(() => {
    fetchSearchResults();
  }, [category]);
  return (
    <div className="flex flex-col sm:flex-row gap-5 my-4">
      <div className="w-full sm:w-72">
        {results.length > 0 ? (
          <Giff giff={results[0]} hover={false} />
        ) : (
          <p>No giff found!!!</p>
        )}
        <FollowOn />

        <div className="divider" />
      </div>

      <div>
        <h2 className="text-4xl pb-1 font-extrabold capitalize">
          {category.split("-").join(" & ")} GIFFs
        </h2>
        <h2 className="text-lg text-gray-400 pb-3 font-semibold hover:text-gray-50 cursor-pointer">
          @{category}
        </h2>

        {results.length > 0 && (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
            {results.map((giff) => (
              <Giff giff={giff} key={giff.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
