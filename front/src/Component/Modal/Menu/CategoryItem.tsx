import { Link } from "react-router-dom";

export interface ICate {
  id: number;
  name: string;
}

interface IProps {
  item: { id: number; name: string };
}

const CategoryItem = ({ item }: IProps): JSX.Element => {
  return (
    <Link to={`/category/${item.id}`}>
      <div className="flex flex-col items-center">
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
