import SearchComp from "../../Component/Search/SearchComp";
import List from "../../Component/List/List";
import { List as ListData } from "../../lib/list";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
interface IProps {
  list: ListData[];
}

const Main = ({ list }: IProps): JSX.Element => {
  const cookie = true;
  return (
    <div>
      <SearchComp />
      <div className="Box">
        {cookie ? (
          <div>
            <div className="p-[2rem] text-[1.7rem] font-bold">최근 본 상품</div>
            <List list={list} />
          </div>
        ) : (
          ""
        )}
        <div className="p-[2rem] text-[1.7rem] font-bold">오늘의 추천상품</div>
        <List list={list} />
      </div>
    </div>
  );
};

export default Main;
