import { Link } from "react-router-dom";
import { Globals } from "../globals";

interface RenderTextInterface {
  content: string;
  className?: string;
}

const RenderText: React.FC<RenderTextInterface> = ({ content, className }) => {
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
    <div
      className={`w-full text-rendered break-words hyphens-auto ${
        className ?? ""
      }`}
    >
      {formatText(content)}
    </div>
  );
};

export default RenderText;
