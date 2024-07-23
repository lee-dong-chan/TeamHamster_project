import { useBreakPoint } from "../../../../CustomHook/BreakPoint";
import { center } from "../../../../lib/styles";

interface IProps {
  text: string;

  click(): void;
}

const CateBtn = ({ text, click }: IProps) => {
  const { ismobile, isdesktop } = useBreakPoint();
  return (
    <div
      onClick={() => {
        click();
      }}
      className={`${
        isdesktop && `${center} bg-gray-100 border-2 p-3 pl-16 pr-16`
      } ${ismobile && `${center} pe-5 font-bold  `} `}
    >
      {text}
    </div>
  );
};

export default CateBtn;
