import { useEffect, useState } from "react";

interface IProps {
  text: string;
  click(): void;
}
const SCbuttons = ({ text, click }: IProps) => {
  //State
  const [colorChange, setColorChange] = useState<boolean>(false);

  // color
  useEffect(() => {
    if (text !== "배송현황") {
      setColorChange(true);
    } else {
      setColorChange(false);
    }
  }, [text]);

  //mount

  return (
    <div
      onClick={() => {
        click();
      }}
      className={`p-2 px-4 ${
        colorChange ? "bg-sky-200" : "bg-yellow-500 opacity-50"
      }`}
    >
      <span className="font-medium text-white">{text}</span>
    </div>
  );
};

export default SCbuttons;
