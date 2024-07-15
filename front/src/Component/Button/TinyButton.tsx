import Button from "../../lib/Button/Button";

interface IProps {
  btn: Button;
}

const TinyButton = ({ btn }: IProps): JSX.Element => {
  return (
    <div
      className={`Center h-[2rem] w-[6rem] text-[1rem] text-white border rounded-[0.5rem] ${btn.getBtnClass()}`}
    >
      <div>{btn.getText()}</div>
    </div>
  );
};

export default TinyButton;
