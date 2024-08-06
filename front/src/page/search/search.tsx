import SearchComp from "../../Component/Search/SearchComp";
import List from "../../Component/List/List";
import { useParams } from "react-router-dom";
import { useBreakPoint } from "../../CustomHook/BreakPoint";
import { box, mobilebox } from "../../lib/styles";
import axios from "axios";
import { IProduct } from "../../lib/interFace";
import { useCallback, useEffect, useMemo } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Searchobserver } from "../../Context/Modal";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const Search = (): JSX.Element => {
  const { isdesktop, ismobile } = useBreakPoint();

  const observerOn = useRecoilValue(Searchobserver);
  const setObserverOn = useSetRecoilState(Searchobserver);

  const { id } = useParams();
  const queryclient = useQueryClient();
  const searchDataGet: any = useQuery({
    queryKey: ["searchlistdata", id],
    queryFn: async () => {
      console.log(id);
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/search`,
        { keyword: id, idx: idxValue },
        { withCredentials: true }
      );

      console.log(data.product);
      const products = data.product;

      if (data.product.length === 0) {
        setObserverOn(false);
      } else {
        setObserverOn(true);
      }
      const listDatas = products.map((data: IProduct) => {
        const listData = {
          id: data.id || 9999999,
          title: data.title,
          img: data.image
            ? `${process.env.REACT_APP_SERVER_URL}/imgs/${data.image[0]}`
            : "/imgs/hamster.png",
          price: data.price,
          createdAt: Math.floor(
            (+new Date() - +new Date(data.createdAt || new Date() + "")) /
              (1000 * 60 * 60 * 24)
          ),
        };
        return listData;
      });
      if (searchDataGet.data && data.product[0] ? true : false) {
        return [...searchDataGet.data, ...listDatas];
      } else if (searchDataGet.data) {
        console.log(searchDataGet.data, "데이터만 있음");
        return searchDataGet.data;
      } else {
        console.log(listDatas);
        return listDatas;
      }
    },
  });

  const idxValue = useMemo(() => {
    return searchDataGet.data?.length;
  }, [searchDataGet.data?.length]);

  const DataGet = useCallback(() => {
    queryclient.invalidateQueries({ queryKey: ["searchlistdata", id] });
  }, [queryclient, id]);

  useEffect(() => {
    DataGet();
  }, [id, DataGet]);

  console.log("서치 무한 체크");

  return (
    <div>
      {isdesktop && <SearchComp />}
      <div className={`${isdesktop && box} ${ismobile && mobilebox} h-screen `}>
        <div className="p-[2rem] text-[1.7rem] font-bold">
          <span className="text-orange-500">{id}</span>의 검색결과
        </div>

        {idxValue ? (
          <div>
            <List
              list={searchDataGet.data}
              func={DataGet}
              funcValue={idxValue}
              toggleValue={observerOn}
            />
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
