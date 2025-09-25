import { Link } from "react-router-dom";

const Giff = ({ giff, hover = true }) => {
  return (
    <Link to={`/${giff.type}/${giff.slug}`}>
      <div className="w-full m-2 relative cursor-pointer group aspect-video">
        <img
          src={giff?.images?.fixed_width?.webp}
          alt={giff?.user?.display_name}
          className="w-full object-cover rounded transition-all duration-300"
        />
        {hover && (
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-b from-transparent via-transparent to-gray-950
          flex gap-3 items-end p-4"
          >
            <img
              src={giff?.user?.avatar_url}
              alt={giff?.alt_text}
              className="h-10 rounded-full"
            />
            <span>{giff?.user?.display_name}</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default Giff;
