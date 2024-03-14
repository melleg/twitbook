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
    <div className="relative">
      <textarea
        placeholder={placeholder}
        className="p-2 glass rounded-lg w-5/6"
        value={value}
        onChange={onChange}
      />
      {/* <div>{value}</div> */}
    </div>
  );
};

export default TextArea;
