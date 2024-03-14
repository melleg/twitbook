import { Link } from "react-router-dom";
import { Globals } from "../globals";

interface RenderTextInterface {
  content: string;
}

const RenderText: React.FC<RenderTextInterface> = ({ content }) => {
  const formatText = (text: string) => {
    return (
      text.match(Globals.WORD_REGEX)?.map((w, index) =>
        w.startsWith("#") ? (
          <Link key={index} to={`search?q=${w}`}>
            {w}
          </Link>
        ) : (
          <span key={index}>{w}</span>
        )
      ) ?? ""
    );
  };

  return (
    <div className="w-full post-body break-words flex flex-wrap gap-1 hyphens-auto">
      {formatText(content)}
    </div>
  );
};

export default RenderText;
