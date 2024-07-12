import SearchComp from "../../Component/Search/SearchComp";
import List from "../../Component/List/List";
import { List as ListData } from "../../lib/Layout/list";
interface IProps {
  list: ListData[];
}

const Search = ({ list }: IProps): JSX.Element => {
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

export default Search;
