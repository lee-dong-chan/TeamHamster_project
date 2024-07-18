import { center } from "../../lib/styles";

interface IProps {
  item: string;
  changeselect: (item: string) => void;
}

const Item = ({ item, changeselect }: IProps): JSX.Element => {
  const data = () => {
    changeselect(item);
  };
  return (
    <div
      onClick={data}
      className={`${center} m-2 h-[10rem] w-[10rem] border text-[1.3rem] font-bold`}
    >
      {item}
    </div>
  );
};

export default Item;
