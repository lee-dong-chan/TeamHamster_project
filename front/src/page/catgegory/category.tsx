import SearchComp from "../../Component/Search/SearchComp";
import { List as ListData } from "../../lib/Layout/list";
import List from "../../Component/List/List";
interface IProps {
  list: ListData[];
}

const Category = ({ list }: IProps): JSX.Element => {
  return (
    <div>
      <SearchComp />
      <div className="Box">
        <div className="p-[2rem] text-[1.7rem] font-bold"></div>
        {list ? <List list={list} /> : <div></div>}
      </div>
    </div>
  );
};

export default Category;
