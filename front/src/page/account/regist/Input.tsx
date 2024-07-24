const Input = ({
  placeholder,
  type,
}: {
  placeholder: string;
  type: string;
}): JSX.Element => {
  return (
    <input
      className="w-full p-2 border rounded border-1 border-solid border-gray-950"
      placeholder={placeholder}
      type={type}
    />
  );
};

export default Input;
