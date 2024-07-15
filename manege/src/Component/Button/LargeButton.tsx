import Button from "../../lib/Button/Button";

export interface IBtn {
  getText(): string;
  getBtnClass(): string;
}

interface IProps {
  btn: Button;
}

const LargeButton = ({ btn }: IProps): JSX.Element => {
  return (
    <div
      className={`Center h-[5rem] w-[55rem] text-[1.5rem] text-white border rounded-[1rem] ${btn.getBtnClass()}`}
    >
      <div>{btn.getText()}</div>
    </div>
  );
};

export default LargeButton;
