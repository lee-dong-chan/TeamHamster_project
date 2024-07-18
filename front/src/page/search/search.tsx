import SearchComp from "../../Component/Search/SearchComp";
import List from "../../Component/List/List";
import { List as ListData } from "../../lib/list";
import { useParams } from "react-router-dom";
import Paging from "../../Component/paging/paging";
import { useBreakPoint } from "../../CustomHook/BreakPoint";
import { box, mobilebox } from "../../lib/styles";

interface IProps {
  list: ListData[];
}

const Search = ({ list }: IProps): JSX.Element => {
  const { isdesktop, ismobile } = useBreakPoint();
  let { id } = useParams();
  const result = true;

  return (
    <div>
      {isdesktop && <SearchComp />}
      <div className={`${isdesktop && box} ${ismobile && mobilebox}`}>
        <div className="p-[2rem] text-[1.7rem] font-bold">
          <span className="text-orange-500">{id}</span>의 검색결과
        </div>

        {result ? (
          <div>
            <List list={list} />
            <div className="py-5 center">{isdesktop && <Paging />}</div>
          </div>
        ) : (
          <div className="pb-20 center">
            <div>
              <div className="p-[2rem] text-[1.7rem] font-bold">
                <span className="text-orange-500">{id}</span>에 대한 검색결과를
                찾을수 없습니다
              </div>
              <div className="h-[1px] flex border "></div>

              <div className="p-1 text-center font-bold">
                -단어의 철자가 정확한지 확인해 보세요
              </div>
              <div className="p-1 text-center font-bold">
                - 보다 일반적인 검색어로 다시 검색해 보세요
              </div>
              <div className="p-1 text-center font-bold">
                - 검색어의 띄어쓰기를 다르게 해보세요
              </div>
              <div className="p-1 text-center font-bold">
                - 유해/금지어가 아닌지 확인해주세요
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
