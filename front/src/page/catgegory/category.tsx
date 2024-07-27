import SearchComp from "../../Component/Search/SearchComp";
import { List as ListData } from "../../lib/list";
import List from "../../Component/List/List";
import Paging from "../../Component/paging/paging";
import { useBreakPoint } from "../../CustomHook/BreakPoint";
import { useCallback, useEffect, useMemo, useState } from "react";
import { IListData } from "../../App";
import { IProduct } from "../../lib/interFace";
import { useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { box, center, mobilebox } from "../../lib/styles";
import { useMutation } from "react-query";
interface IProps {}

const Category = ({}: IProps): JSX.Element => {
  const { isdesktop, ismobile } = useBreakPoint();
  const cate: string = "자동차";
  const [catelist, setcatelist] = useState<ListData[]>([]);
  const [ListDatas, setListDatas] = useState<IListData[]>([]);
  const [obServerOn, setObserverOn] = useState<boolean>(true);

  let { id } = useParams();

  const idxValue = useMemo(() => {
    return ListDatas.length;
  }, [ListDatas]);

  const cateDataGet = useCallback(async (idxValue: number) => {
    await axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/category/${id}`,
        { idx: idxValue },
        { withCredentials: true }
      )
      .then((data: AxiosResponse) => {
        const products: IProduct[] = data.data.product;
        const listDatas: IListData[] = products.map((data: IProduct) => {
          const listData: IListData = {
            id: data.id || 9999999,
            title: data.title,
            img: data.image
              ? `${process.env.REACT_APP_SERVER_URL}/imgs/${data.image[0]}`
              : "/imgs/hamster.png",
            price: data.price,
            category: data.Category?.name,
            createdAt: Math.floor(
              (+new Date() - +new Date(data.createdAt || new Date() + "")) / (1000 * 60 * 60 * 24)
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
  }, []);

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
  useEffect(() => {
    if (ListDatas[0]) {
      setcatelist(
        ListDatas.map((data) => {
          return new ListData(data.id, data.title, data.img, data.price, data.createdAt);
        })
      );
    }
  }, [ListDatas]);

  useEffect(() => {
    cateDataGet(idxValue);
    getcatename.mutate();
  }, []);
  return (
    <div>
      {isdesktop && <SearchComp />}
      <div className={`${isdesktop && box} ${ismobile && mobilebox}`}>
        <div className="p-[2rem] text-[1.7rem] font-bold">
          <span className="text-orange-500">{getcatename.data}</span> 추천상품
        </div>
        {catelist[0] ? (
          <div>
            <List
              list={catelist}
              func={cateDataGet}
              funcValue={idxValue}
              toggleValue={obServerOn}
            />
            {/* <div className={`${center}`}>{isdesktop && <Paging />}</div> */}
          </div>
        ) : (
          <div className="pb-20 center">
            <div>
              <div className="p-[2rem] text-[1.7rem] font-bold flex flex-col items-center">
                <div>
                  <span className="pe-2 text-orange-500">{getcatename.data}</span>
                  항목에 해당하는 상품이 없습니다.
                </div>
                <div>
                  <img src={`${process.env.REACT_APP_IMG_BASE}hamster.png`}></img>
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
