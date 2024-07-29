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
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Searchobserver, key } from "../../Context/Modal";
import { IList } from "../../Component/List/ListItem";
import { useMutation } from "react-query";

interface IProps {}

const Search = ({}: IProps): JSX.Element => {
  const { isdesktop, ismobile } = useBreakPoint();

  const observerOn = useRecoilValue(Searchobserver);
  const setObserverOn = useSetRecoilState(Searchobserver);

  const { id } = useParams();

  const searchDataGet: any = useMutation({
    mutationKey: "searchlistdata",
    mutationFn: async (idxValue: number) => {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/search`,
        { keyword: id, idx: idxValue },
        { withCredentials: true }
      );

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
            (+new Date() - +new Date(data.createdAt || new Date() + "")) / (1000 * 60 * 60 * 24)
          ),
        };
        return listData;
      });
      if (searchDataGet.data ? true : false) {
        return [...searchDataGet.data, ...listDatas];
      } else {
        return listDatas;
      }
    },
  });

  const idxValue = useMemo(() => {
    return searchDataGet.data?.length;
  }, [searchDataGet.data?.length]);

  useEffect(() => {
    searchDataGet.mutate(idxValue);
  }, [id]);

  return (
    <div>
      {isdesktop && <SearchComp />}
      <div className={`${isdesktop && box} ${ismobile && mobilebox} h-[60rem] `}>
        <div className="p-[2rem] text-[1.7rem] font-bold">
          <span className="text-orange-500">{id}</span>의 검색결과
        </div>

        {idxValue ? (
          <div>
            <List
              list={searchDataGet.data}
              func={searchDataGet.mutate}
              funcValue={idxValue}
              toggleValue={observerOn}
            />
          </div>
        ) : (
          <div className="pb-20 center">
            <div>
              <div className="p-[2rem] text-[1.7rem] font-bold">
                <span className="text-orange-500">{id}</span>에 대한 검색결과를 찾을수 없습니다
              </div>
              <div className="h-[1px] flex border "></div>

              <div className="p-1 text-center font-bold">-단어의 철자가 정확한지 확인해 보세요</div>
              <div className="p-1 text-center font-bold">
                - 보다 일반적인 검색어로 다시 검색해 보세요
              </div>
              <div className="p-1 text-center font-bold">- 검색어의 띄어쓰기를 다르게 해보세요</div>
              <div className="p-1 text-center font-bold">- 유해/금지어가 아닌지 확인해주세요</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
