import SearchComp from "../../Component/Search/SearchComp";
import List from "../../Component/List/List";
import { List as ListData } from "../../lib/list";
import { useBreakPoint } from "../../CustomHook/BreakPoint";

interface IProps {
  list: ListData[];
}

const Main = ({ list }: IProps): JSX.Element => {
  const { ismobile, isdesktop } = useBreakPoint();
  const cookie = true;
  return (
    <div>
      {isdesktop && <SearchComp />}
      <div className={`${isdesktop && "Box"} ${ismobile && "MobileBox"}`}>
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
