import { Link } from "react-router-dom";
import { Globals } from "../globals";

interface RenderTextInterface {
  content: string;
  className?: string;
}

const RenderText: React.FC<RenderTextInterface> = ({ content, className }) => {
  const formatText = (text: string) => {
    const matchesAndNonMatches = matchAndSplit(text, Globals.HASHTAG_REGEX);

    return matchesAndNonMatches.map((w, index) =>
      w.match(Globals.HASHTAG_REGEX) ? (
        <Link
          onClick={(e) => e.stopPropagation()}
          key={index}
          to={`/search?h=${w.slice(1)}`}
        >
          {w}
        </Link>
      ) : (
        <span key={index}>{w}</span>
      )
    );
  };

  // Returns the non-matching and matching groups as an ordered string array
  const matchAndSplit = (string: string, regex: RegExp) => {
    const result: string[] = [];
    let lastIndex = 0;
    let match;
    while ((match = regex.exec(string)) !== null) {
      // Push the non-matching text
      if (match.index > lastIndex) {
        result.push(string.slice(lastIndex, match.index));
      }
      // Push the matching text
      result.push(match[0]);
      lastIndex = regex.lastIndex;
    }
    // Push any remaining non-matching text
    if (lastIndex < string.length) {
      result.push(string.slice(lastIndex));
    }
    return result;
  };

  return (
    <div
      className={`w-full text-rendered break-words hyphens-auto whitespace-pre-line ${className}`}
    >
      {formatText(content)}
    </div>
  );
};

export default RenderText;
