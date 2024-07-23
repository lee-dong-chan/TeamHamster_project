import { FC } from "react";

const Input = ({
  placeholder,
  type,
  value,
}: // onChange,
{
  placeholder: string;
  type: string;
  value: any;
  // onChange: any;
}): JSX.Element => {
  return (
    <input
      className="w-full p-2 border rounded border-1 border-solid border-gray-950"
      placeholder={placeholder}
      type={type}
      value={""}
      // onChange={""}
    />
  );
};

export default Input;
