import { List as ListData } from "../../lib/list";
import Item from "./ListItem";

interface IProps {
  list: ListData[];
}

const List = ({ list }: IProps): JSX.Element => {
  return (
    <div className="Center">
      <div className="w-[65rem] grid grid-cols-4">
        {list.map((item: ListData, idx: number) => (
          <Item key={idx} item={item} />
        ))}
      </div>
    </div>
  );
};

export default List;
