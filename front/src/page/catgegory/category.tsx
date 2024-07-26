import SearchComp from "../../Component/Search/SearchComp";
import { List as ListData } from "../../lib/list";
import List from "../../Component/List/List";
import Paging from "../../Component/paging/paging";
import { useBreakPoint } from "../../CustomHook/BreakPoint";
import { useEffect, useState } from "react";
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

  let { id } = useParams();

  const cateDataGet = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/category/${id}`,
        {},
        { withCredentials: true }
      )
      .then((data: AxiosResponse) => {
        const products: IProduct[] = data.data.product;

        const listDatas: IListData[] = products.map((data: IProduct) => {
          const listData: IListData = {
            id: data.id || 9999999,
            title: data.title,
            img: data.image ? data.image[0] : "hamster.png",
            price: data.price,
            category: data.Category?.name,
            createdAt: Math.floor(
              (+new Date() - +new Date(data.createdAt || new Date() + "")) /
                (1000 * 60 * 60 * 24)
            ),
          };
          return listData;
        });
        setListDatas(listDatas);
      })

      .catch(() => {
        setListDatas([
          {
            id: 1,
            title: "자전거 ok",
            img: "hamster.png",
            price: 3000,
            createdAt: 3,
          },
        ]);
      });
  };

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
    cateDataGet();
    getcatename.mutate();
  }, []);
  return (
    <div>
      {isdesktop && <SearchComp />}
      <div className={`${isdesktop && box} ${ismobile && mobilebox}`}>
        <div className="p-[2rem] text-[1.7rem] font-bold">
          <span className="text-orange-500">{getcatename.data}</span> 추천상품
        </div>
        {catelist ? (
          <div>
            <List list={catelist} />
            {/* <div className={`${center}`}>{isdesktop && <Paging />}</div> */}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Category;
