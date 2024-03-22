import { Globals } from "../globals";
import RenderText from "./RenderText";

interface TextAreaProps {
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<TextAreaProps> = ({
  value,
  placeholder,
  onChange,
}) => {
  return (
    <div className="text-area relative w-full overflow-hidden h-72 sm:h-40 md:h-32">
      <textarea
        placeholder={placeholder}
        maxLength={Globals.POST_MAX_LENGTH}
        className="p-2 w-full h-full margin-0 rounded-lg text-red-700 resize-none overflow-hidden"
        value={value}
        onChange={onChange}
      />

      <RenderText
        content={value}
        className="p-2 absolute inset-0 pointer-events-none"
      />
    </div>
  );
};

export default TextArea;
