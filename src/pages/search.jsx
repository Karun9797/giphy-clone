import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GiffState } from "../context/GiffContext";
import FilterGiff from "../components/FilterGiff";
import Giff from "../components/Giff";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { query } = useParams();
  const { giffKey, giffs, filter } = GiffState();

  const fetchSearchResults = async () => {
    const { data } = await giffKey.search(query, {
      sort: "relevant",
      lang: "en",
      type: filter,
      limit: 20,
    });
    setSearchResults(data);
  };

  useEffect(() => {
    fetchSearchResults();
  }, [filter, query]);
  return (
    <>
      <div className="my-4">
        <h2 className="text-5xl pb-3 font-extrabold">{query}</h2>

        <FilterGiff />

        {searchResults.length > 0 ? (
          <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-3">
            {searchResults.map((giff) => (
              <Giff key={giff?.id} giff={giff} />
            ))}
          </div>
        ) : (
          <span>Nothing found for this query: {query}</span>
        )}
      </div>
    </>
  );
};

export default SearchPage;
