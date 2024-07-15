import SearchComp from "../../Component/Search/SearchComp";
import { List as ListData } from "../../lib/list";
import List from "../../Component/List/List";
import Paging from "../../Component/paging/paging";
interface IProps {
  list: ListData[];
}

const Category = ({ list }: IProps): JSX.Element => {
  const cate: string = "자동차";
  return (
    <div>
      <SearchComp />
      <div className="Box">
        <div className="p-[2rem] text-[1.7rem] font-bold">
          <span className="text-orange-500">{cate}</span> 추천상품
        </div>
        {list ? (
          <div>
            <List list={list} />
            <div className="Center">
              <Paging />
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Category;
