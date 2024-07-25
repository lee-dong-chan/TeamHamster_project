import { useEffect, useLayoutEffect, useState } from "react";
import Layout from "./lib/Layout/layout";
import { List } from "./lib/list";

import { useBreakPoint } from "./CustomHook/BreakPoint";
import axios, { AxiosResponse } from "axios";
import { IUserDatas, IProduct } from "./lib/interFace";
import { errUserDatas } from "./lib/errors";

export interface IListData {
  id: number;
  title: string;
  img: string;
  price: number;
  createdAt: number;
}

const App = (): JSX.Element => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [main, setMain] = useState<List[]>([]);
  const [ListDatas, setListDatas] = useState<IListData[]>([]);

  const [userlogin, setUserLogin] = useState<boolean>(false);
  const [userDatas, setUserDatas] = useState<IUserDatas>(errUserDatas);

  //func
  const mainDataGet = async () => {
    await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/main`, {}, { withCredentials: true })
      .then((data: AxiosResponse) => {
        const products: IProduct[] = data.data.product;
        const listDatas: IListData[] = products.map((data: IProduct) => {
          const listData: IListData = {
            id: data.id || 9999999,
            title: data.title,
            img: data.image ? data.image[0] : "hamster.png",
            price: data.price,
            createdAt: Math.floor(
              (+new Date() - +new Date(data.createdAt || new Date() + "")) / (1000 * 60 * 60 * 24)
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
            title: "자전거",
            img: "hamster.png",
            price: 3000,
            createdAt: 3,
          },
          {
            id: 2,
            title: "자전건가",
            img: "hamster.png",
            price: 3000,
            createdAt: 3,
          },
        ]);
      });
  };

  const userDataCheck = async () => {
    axios
      .post(`${serverUrl}/layout`, {}, { withCredentials: true })
      .then((data: AxiosResponse<IUserDatas>) => {
        if (data.data.login) {
          setUserDatas(data.data);
          setUserLogin(true);
        }
      })
      .catch((err) => {
        console.log("layOut userDataCheck func Err", err);
      });
  };

  //mount
  useEffect(() => {
    if (ListDatas[0]) {
      setMain(
        ListDatas.map((data) => {
          return new List(data.id, data.title, data.img, data.price, data.createdAt);
        })
      );
    }
  }, [ListDatas]);

  useEffect(() => {
    mainDataGet();
    userDataCheck();
  }, []);

  return (
    <div>
      <div>
        <Layout
          userDatas={userDatas}
          setUserLogin={setUserLogin}
          userlogin={userlogin}
          main={main}
          userDataCheck={userDataCheck}
        />
      </div>
    </div>
  );
};

export default App;
