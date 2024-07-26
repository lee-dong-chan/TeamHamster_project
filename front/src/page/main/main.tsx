import SearchComp from "../../Component/Search/SearchComp";
import List from "../../Component/List/List";
import { List as ListData } from "../../lib/list";
import { useBreakPoint } from "../../CustomHook/BreakPoint";
import { box, mobilebox } from "../../lib/styles";
import { IListData } from "../../App";
import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
<<<<<<< HEAD
import Observer from "../../Component/Observer/Observer";
=======
import { useMutation } from "react-query";
>>>>>>> 78a2325 (find)

interface IProps {
  list: ListData[];
  mainDataGet: () => void;
  obToggleValue: boolean;
}

const Main = ({ list, mainDataGet, obToggleValue }: IProps): JSX.Element => {
  const [cookies] = useCookies(["Product"]);
  const { ismobile, isdesktop } = useBreakPoint();
  const [recent, setrecent] = useState<ListData[]>([]);
  const [recentlist, setresent] = useState<number[]>([]);

  const products = cookies.Product.product;
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
  const pre: number[] = recentproduct.map((item: string) => {
    return Number(item);
  });

  const getrecent = useMutation({
    mutationKey: "recentitems",
    mutationFn: async () => {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/recent`,
        { productlist: pre },
        { withCredentials: true }
      );

      const products = data;
      console.log(products);
      const product = products.productlist;
      console.log(product);
    },
  });

  const cookie = false;

  useEffect(() => {
    getrecent.mutate();
    mainDataGet();
  }, []);

  return (
    <div>
      {isdesktop && <SearchComp />}
      <div className={`${isdesktop && `${box}`} ${ismobile && mobilebox}`}>
        {cookie ? (
          <div>
            <div className="mx-auto w-[10rem] flex justify-evenly bg-red-200">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="p-[2rem] text-[1.7rem] font-bold">최근 본 상품</div>
        <List list={recent} />
        <div className="p-[2rem] text-[1.7rem] font-bold">오늘의 추천상품</div>
        <List list={list} func={mainDataGet} toggleValue={obToggleValue} />
      </div>
    </div>
  );
};

export default Main;
