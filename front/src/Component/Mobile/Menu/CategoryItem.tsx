import { Link } from "react-router-dom";

interface IProps {
  ModalOff(): void;
  item: { id: number; name: string };
}

const CategoryItem = ({ ModalOff, item }: IProps): JSX.Element => {
  console.log(item);
  return (
    <Link to={`/category/${item.id}`}>
      <div className="flex flex-col items-center" onClick={ModalOff}>
        <div className="h-[6rem] w-[6rem] rounded-[6rem] border border-gray-500 overflow-hidden ">
          <img
            className="h-[100%]"
            src={`/imgs/category/category${item.id}.png`}
          ></img>
        </div>
        <div>{item.name}</div>
      </div>
    </Link>
  );
};

export default CategoryItem;
