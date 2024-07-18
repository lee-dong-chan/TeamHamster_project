import { Button } from "../../lib/Button/Button";
import { center } from "../../lib/styles";

interface IProps {
  btn: Button;
  width?: string;
  text?: string;
  height?: string;
  rounded?: string;
}
// w-[55rem]
const ButtonComp = ({
  btn,
  width = "w-[20rem]",
  text = "text-[1.5rem]",
  height = "h-[6rem]",
  rounded = "rounded-[1rem]",
}: IProps): JSX.Element => {
  return (
    <div
      className={`${center} ${height} ${text} text-white border ${rounded}  ${btn.getBtnClass()} ${width}`}
    >
      <div>{btn.getText()}</div>
    </div>
  );
};

export default ButtonComp;

export const LargeButton = ({ btn }: IProps): JSX.Element => {
  return <ButtonComp btn={btn} width="w-[55rem]" />;
};

export const SmallButton = ({ btn }: IProps): JSX.Element => {
  return <ButtonComp btn={btn} width="w-[10rem]" />;
};

export const TinyButton = ({ btn }: IProps): JSX.Element => {
  return (
    <ButtonComp
      btn={btn}
      width="w-[6rem]"
      text="text-[1rem]"
      height="h-[2rem]"
      rounded="rounded-[0.5rem]"
    />
  );
};
