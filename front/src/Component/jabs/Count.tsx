import { center } from "../../lib/styles";

interface IProps {
  text: string;
  number: string | number;
}

const Count = ({ text, number }: IProps) => {
  return (
    <div className={`flex pt-5 pb-5 justify-between`}>
      <div className={`pl-1 flex`}>
        <span className={`font-normal text-lg`}>{text}</span>
        <span className={`${center} pl-1`}>
          <span className="text-red-500">{number}</span>
          <span>개</span>
        </span>
      </div>
    </div>
  );
};
export default Count;
