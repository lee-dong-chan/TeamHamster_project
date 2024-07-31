import { useBreakPoint } from "../../CustomHook/BreakPoint";
import { List as ListData } from "../../lib/list";
import { box, center } from "../../lib/styles";
import Item, { IList } from "./ListItem";
import Observer from "../Observer/Observer";

interface IProps {
  list: IList[];
  func?: (i: number) => void;
  funcValue?: number;
  toggleValue?: boolean;
}

const List = ({ list, func, toggleValue, funcValue }: IProps): JSX.Element => {
  const { isdesktop, ismobile } = useBreakPoint();
  return (
    <div className={`${isdesktop && box} ${ismobile && "MobileBox overflow-auto scrollbar-hide"}`}>
      <div className={`${center}`}>
        <div
          className={`w-[65rem] min-w-[30rem] ${isdesktop && "grid grid-cols-4"} ${
            ismobile && "ms-12 w-[25rem] min-h-[31.5rem] grid grid-cols-2"
          }`}
        >
          {list?.map((item: IList, idx: number) => (
            <Item key={idx} item={item} />
          ))}
          {toggleValue && funcValue && func && <Observer func={func} funcValue={funcValue} />}
        </div>
      </div>
    </div>
  );
};

export default List;
