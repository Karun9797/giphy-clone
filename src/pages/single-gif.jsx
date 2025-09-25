import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GiffState } from "../context/GiffContext";
import Giff from "../components/Giff";
import {
  HiMiniChevronDown,
  HiMiniChevronUp,
  HiMiniHeart,
} from "react-icons/hi2";
import FollowOn from "../components/FollowOn";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FaPaperPlane } from "react-icons/fa6";
import { IoCodeSharp } from "react-icons/io5";

const contentType = ["gif", "stickers", "texts"];

const GifPage = () => {
  const { type, slug } = useParams();
  const [giff, setGiff] = useState({});
  const [relatedGiffs, setRelatedGiffs] = useState([]);
  const [readMore, setReadMode] = useState(false);

  const { giffKey, favorites, addToFavorites } = GiffState();

  useEffect(() => {
    if (!contentType.includes(type)) {
      throw new Error("Invalid content type");
    }

    const fetchGiff = async () => {
      const giffID = slug.split("-");
      const { data } = await giffKey.gif(giffID[giffID.length - 1]);
      const { data: related } = await giffKey.related(
        giffID[giffID.length - 1]
      );

      setGiff(data);
      setRelatedGiffs(related);
    };

    fetchGiff();
  }, [type, slug]);

  const shareGiff = () => {};

  const EmbedGiff = () => {};

  return (
    <div className="grid grid-cols-4 my-10 gap-4">
      <div className="hidden sm:block">
        {giff?.user && (
          <>
            <div className="flex gap-1">
              <img
                src={giff?.user?.avatar_url}
                alt={giff?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{giff?.user?.display_name}</div>
                <div className="faded-text">@{giff?.user?.username}</div>
              </div>
            </div>

            {giff?.user?.description && (
              <div className="py-4 whitespace-pre-line text-sm text-gray-400">
                {readMore
                  ? giff?.user?.description
                  : giff?.user?.description.slice(0, 100) + "..."}
                <div
                  className="flex items-center faded-text cursor-pointer mt-2"
                  onClick={() => setReadMode(!readMore)}
                >
                  {readMore ? (
                    <>
                      Read less <HiMiniChevronUp size={20} />
                    </>
                  ) : (
                    <>
                      Read more <HiMiniChevronDown size={20} />
                    </>
                  )}
                </div>
              </div>
            )}
          </>
        )}
        <FollowOn />
        <div className="divider">
          {giff?.source && (
            <div>
              <span className="faded-text">Souce</span>
              <div className="flex item-center text-sm font-bold gap-1">
                <HiOutlineExternalLink size={25} />
                <a href={giff?.source} target="_blank" className="truncate">
                  {giff?.source}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="col-span-4 sm:col-span-3">
        <div className="flex gap-6">
          <div className="w-full sm:w-3/4">
            <div className="faded-text">{giff.title}</div>
            <Giff giff={giff} hover={false} />

            <div className="flex sm:hidden gap-1">
              <img
                src={giff?.user?.avatar_url}
                alt={giff?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{giff?.user?.display_name}</div>
                <div className="faded-text">@{giff?.user?.username}</div>
              </div>

              <button
                className="ml-auto"
                // onClick={shareGiff}
              >
                <FaPaperPlane size={25} />
              </button>
            </div>
          </div>
          <div className="hidden sm:flex flex-col gap-5 mt-6">
            <button
              onClick={() => addToFavorites(giff.id)}
              className="flex gap-5 items-center font-bold text-lg"
            >
              <HiMiniHeart
                size={30}
                className={`${
                  favorites.includes(giff.id) ? "text-red-500" : ""
                }`}
              />
              Favorite
            </button>
            <button
              // onClick={shareGiff}
              className="flex gap-6 items-center font-bold text-lg"
            >
              <FaPaperPlane size={25} />
              Share
            </button>
            <button
              // onClick={EmbedGiff}
              className="flex gap-5 items-center font-bold text-lg"
            >
              <IoCodeSharp size={30} />
              Embed
            </button>
          </div>
        </div>
        <div>
          <span className="font-extrabold">Related Giff</span>
          <div className="columns-2 md:columns-3 gap-2">
            {relatedGiffs.slice(1).map((giff) => (
              <Giff giff={giff} key={giff.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GifPage;
