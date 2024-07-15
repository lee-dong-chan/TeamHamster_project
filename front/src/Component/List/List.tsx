import { useBreakPoint } from "../../CustomHook/BreakPoint";
import { List as ListData } from "../../lib/list";
import Item from "./ListItem";

interface IProps {
  list: ListData[];
}

const List = ({ list }: IProps): JSX.Element => {
  const { isdesktop, ismobile } = useBreakPoint();
  return (
    <div className="Center">
      <div
        className={`w-[65rem] ${isdesktop && "grid grid-cols-4"} ${
          ismobile && "grid grid-cols-2"
        }`}
      >
        {list.map((item: ListData, idx: number) => (
          <Item key={idx} item={item} />
        ))}
      </div>
    </div>
  );
};

export default List;
