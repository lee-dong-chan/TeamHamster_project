import { center } from "../../../../lib/styles";

interface IProps {
  text: string;

  click(): void;
}

const CateBtn = ({ text, click }: IProps) => {
  return (
    <div
      onClick={() => {
        click();
      }}
      className={`${center} bg-gray-100 border-2 p-3 pl-16 pr-16`}
    >
      {text}
    </div>
  );
};

export default CateBtn;
