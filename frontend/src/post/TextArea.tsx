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
    <div className="relative w-full rounded-lg">
      <textarea
        placeholder={placeholder}
        maxLength={Globals.POST_MAX_LENGTH}
        className="p-2 glass w-full margin-0 text-red-700 resize-none overflow-hidden h-32"
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
