import SearchComp from "../../Component/Search/SearchComp";
import List from "../../Component/List/List";
import { List as ListData } from "../../lib/list";
import { useParams } from "react-router-dom";
import Paging from "../../Component/paging/paging";
import { useBreakPoint } from "../../CustomHook/BreakPoint";
import { box, mobilebox } from "../../lib/styles";
import axios, { AxiosResponse } from "axios";
import { IListData } from "../../App";
import { IProduct } from "../../lib/interFace";
import { useEffect, useState } from "react";

interface IProps {}

const Search = ({}: IProps): JSX.Element => {
  const [search, setSearch] = useState<ListData[]>([]);
  const [ListDatas, setListDatas] = useState<IListData[]>([]);
  const { isdesktop, ismobile } = useBreakPoint();
  let { id } = useParams();
  const [obServerOn, setObserverOn] = useState<boolean>(true);
  const result = true;

  const searchDataGet = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/search`,
        { keyword: id, idx: ListDatas.length },
        { withCredentials: true }
      )
      .then((data: AxiosResponse) => {
        console.log(data);
        const products: IProduct[] = data.data.product;
        const listDatas: IListData[] = products.map((data: IProduct) => {
          const listData: IListData = {
            id: data.id || 9999999,
            title: data.title,
            img: data.image ? data.image[0] : "hamster.png",
            price: data.price,
            createdAt: Math.floor(
              (+new Date() - +new Date(data.createdAt || new Date() + "")) /
                (1000 * 60 * 60 * 24)
            ),
          };
          return listData;
        });
        if (
          products === undefined ||
          products === null ||
          products[0] === undefined ||
          products[0] === null
        ) {
          setObserverOn(false);
        } else {
          setObserverOn(true);
        }
        setListDatas((datas) => [...datas, ...listDatas]);
      })
      .catch(() => {
        setListDatas((datas) => [
          ...datas,
          ...[
            {
              id: 1,
              title: "자전거 ok",
              img: "hamster.png",
              price: 3000,
              createdAt: 3,
            },
          ],
        ]);
      });
  };
  //mount
  useEffect(() => {
    if (ListDatas[0]) {
      setSearch(
        ListDatas.map((data) => {
          return new ListData(
            data.id,
            data.title,
            data.img,
            data.price,
            data.createdAt
          );
        })
      );
    }
  }, [ListDatas]);

  useEffect(() => {
    searchDataGet();
  }, []);

  return (
    <div>
      {isdesktop && <SearchComp />}
      <div className={`${isdesktop && box} ${ismobile && mobilebox}`}>
        <div className="p-[2rem] text-[1.7rem] font-bold">
          <span className="text-orange-500">{id}</span>의 검색결과
        </div>

        {result ? (
          <div>
            <List list={search} func={searchDataGet} toggleValue={obServerOn} />
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
