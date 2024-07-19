import { useBreakPoint } from "../../../CustomHook/BreakPoint";

interface IProps {
  item: string;
}

const Imgs = ({ item }: IProps): JSX.Element => {
  const { ismobile, isdesktop } = useBreakPoint();
  return (
    <div
      className={`${isdesktop && "h-[50rem] w-[70rem]"} ${
        ismobile && "h-[25rem] w-[25rem]"
      } border rounded-[2rem] overflow-hidden`}
    >
      <img className="h-[100%] w-[100%]" src={`/imgs/${item}.png`}></img>
    </div>
  );
};

export default Imgs;
