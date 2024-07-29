import SearchComp from "../../Component/Search/SearchComp";

import List from "../../Component/List/List";

import { useBreakPoint } from "../../CustomHook/BreakPoint";
import { useCallback, useEffect, useMemo, useState } from "react";
import { IProduct } from "../../lib/interFace";
import { useParams } from "react-router-dom";
import axios from "axios";
import { box, mobilebox } from "../../lib/styles";
import { useMutation } from "react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryobserver } from "../../Context/Modal";
interface IProps {}

const Category = ({}: IProps): JSX.Element => {
  const { isdesktop, ismobile } = useBreakPoint();
  const obServerOn = useRecoilValue(categoryobserver);
  const setObserverOn = useSetRecoilState(categoryobserver);
  const [idxValue, setidxValue] = useState<number>(0);

  let { id } = useParams();

  const cateDataGet = useMutation({
    mutationKey: "catelistdata",
    mutationFn: async (idxValue: number) => {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/category/${id}`,
        { idx: idxValue },
        { withCredentials: true }
      );

      console.log(data);

      const products = data.product;
      const listData = products.map((data: IProduct) => {
        const listdata = {
          id: data.id || 9999999,
          title: data.title,
          img: data.image
            ? `${process.env.REACT_APP_SERVER_URL}/imgs/${data.image[0]}`
            : "/imgs/hamster.png",
          price: data.price,
          catatedAt: Math.floor(
            (+new Date() - +new Date(data.createdAt || new Date() + "")) /
              (1000 * 60 * 60 * 24)
          ),
        };
        return listdata;
      });

      return listData;
    },
    onSuccess(data) {
      if (data.length === 0) {
        setObserverOn(false);
      } else {
        setObserverOn(true);
      }
    },
  });

  console.log(obServerOn);

  const getcatename = useMutation({
    mutationKey: "catename",
    mutationFn: async () => {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/category/${id}`,
        {},
        { withCredentials: true }
      );

      const name = data.nowcate.name;
      return name;
    },
  });

  //mount

  // const idxValue = useMemo(() => {
  //   return cateDataGet.data?.length;
  // }, [id]);
  const changevalue = useCallback(() => {
    setidxValue(cateDataGet.data?.length);
  }, []);

  console.log(cateDataGet.data);

  useEffect(() => {
    cateDataGet.mutate(idxValue);
    getcatename.mutate();
    changevalue();
  }, [id]);

  console.log(idxValue);
  return (
    <div>
      {isdesktop && <SearchComp />}
      <div
        className={`${isdesktop && box} ${
          ismobile && mobilebox
        } h-[40rem] overflow-auto`}
      >
        <div className="p-[2rem] text-[1.7rem] font-bold">
          <span className="text-orange-500">{getcatename.data}</span> 추천상품
        </div>
        {cateDataGet.data?.length !== 0 ? (
          <div>
            <List
              list={cateDataGet.data}
              func={cateDataGet.mutate}
              funcValue={idxValue}
              toggleValue={obServerOn}
            />
          </div>
        ) : (
          <div className="pb-20 center">
            <div>
              <div className="p-[2rem] text-[1.7rem] font-bold flex flex-col items-center">
                <div>
                  <span className="pe-2 text-orange-500">
                    {getcatename.data}
                  </span>
                  항목에 해당하는 상품이 없습니다.
                </div>
                <div>
                  <img
                    src={`${process.env.REACT_APP_IMG_BASE}hamster.png`}
                  ></img>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
