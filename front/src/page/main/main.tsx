import Item, { IItem } from "../../Component/List/ListItem";
import SearchComp from "../../Component/Search/SearchComp";
import List from "../../Component/List/List";
import { List as ListData } from "../../lib/Layout/list";
interface IProps {
  list: ListData[];
}

const Main = ({ list }: IProps): JSX.Element => {
  return (
    <div>
      <SearchComp />
      <div className="Box">
        <div className="p-[2rem] text-[1.7rem] font-bold">오늘의 추천상품</div>
        <List list={list} />
      </div>
    </div>
  );
};

export default Main;
