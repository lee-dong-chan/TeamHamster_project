import { Link } from "react-router-dom";

export interface IChild {
  id: number;
  name: string;
}

interface IProps {
  item: IChild;
  idx: number;
}

const CategoryItem = ({ item, idx }: IProps): JSX.Element => {
  return (
    <Link to={`/category/${item.id}`}>
      <div className="p-2 border-t flex items-center">
        <span className="px-1 text-[0.9rem] text-orange-500">{idx}</span>
        <span>{item.name}</span>
      </div>
    </Link>
  );
};

export default CategoryItem;
