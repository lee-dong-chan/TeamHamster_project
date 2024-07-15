import Button from "../../lib/Button/Button";

interface IProps {
  btn: Button;
}

const MiddelButton = ({ btn }: IProps): JSX.Element => {
  return (
    <div
      className={`Center h-[5rem] w-[20rem] text-[1.5rem] text-white border rounded-[1rem] ${btn.getBtnClass()}`}
    >
      <div>{btn.getText()}</div>
    </div>
  );
};

export default MiddelButton;
