import SearchComp from "../../Component/Search/SearchComp";
import List from "../../Component/List/List";
import { List as ListData } from "../../lib/list";
import { useBreakPoint } from "../../CustomHook/BreakPoint";
import { box, mobilebox } from "../../lib/styles";

import { useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import Observer from "../../Component/Observer/Observer";
import { useMutation } from "react-query";

interface IProps {
  list: ListData[];
  mainDataGet: (i: number) => void;
  obToggleValue: boolean;
  idxValue: number;
}

const Main = ({
  idxValue,
  list,
  mainDataGet,
  obToggleValue,
}: IProps): JSX.Element => {
  interface IData {
    Category: { name: string };
    categoryId: number;
    createdAt: Date;
    discription: string;
    id: number;
    image: [string];
    img: string;
    itemState: string;
    price: number;
    title: string;
  }

  const [cookies] = useCookies(["Product"]);
  const { ismobile, isdesktop } = useBreakPoint();
  const [recent, setrecent] = useState<ListData[]>([]);
  const [recentlist, setresent] = useState<number[]>([]);

  console.log(cookies);

  const procookie = useMemo(() => {
    if (cookies.Product) {
      const products = cookies.Product?.product;

      const recentproduct = products
        .split("+")
        .filter((item: string) => item != "")
        .filter((item: String, idx: number) => {
          return (
            products
              .split("+")
              .filter((item: string) => item != "")
              .indexOf(item) === idx
          );
        });
      const data: number[] = recentproduct.map((item: string) => {
        return Number(item);
      });
      return data;
    }
  }, []);

  const getrecent = useMutation({
    mutationKey: "recentitems",
    mutationFn: async () => {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/recent`,
        { productlist: procookie },
        { withCredentials: true }
      );

      const products = data;
      console.log(products);

      const product = products.productlist;
      const lastdata = product.map((item: IData) => {
        return new ListData(
          item.id,
          item.title,
          item.image
            ? `${process.env.REACT_APP_SERVER_URL}/imgs/${item.image[0]}`
            : "/imgs/hamster.png",
          item.price,
          Math.floor(
            (+new Date() - +new Date(item.createdAt || new Date() + "")) /
              (1000 * 60 * 60 * 24)
          )
        );
      });
      return lastdata;
    },
  });

  useEffect(() => {
    console.log(procookie);
    mainDataGet(idxValue);
  }, []);

  useEffect(() => {
    if (procookie) {
      getrecent.mutate();
    }
  }, [procookie]);

  return (
    <div>
      {isdesktop && <SearchComp />}
      <div className={`${isdesktop && `${box}`} ${ismobile && mobilebox}`}>
        {procookie && (
          <div>
            <div className="p-[2rem] text-[1.7rem] font-bold">최근 본 상품</div>
            <List list={getrecent.data} />
          </div>
        )}
        <div>
          <div className="p-[2rem] text-[1.7rem] font-bold">
            오늘의 추천상품
          </div>
          <List list={list} func={mainDataGet} toggleValue={obToggleValue} />
        </div>
      </div>
    </div>
  );
};

export default Main;
