import { useCallback, useEffect, useMemo, useState } from "react";
import Layout from "./lib/Layout/layout";
import { List } from "./lib/list";

import axios, { AxiosResponse } from "axios";
import { IUserDatas, IProduct } from "./lib/interFace";
import { errUserDatas } from "./lib/errors";
import { useMutation } from "react-query";
import { IData } from "./page/main/main";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { mainobserver } from "./Context/Modal";

export interface IListData {
  id: number;
  title: string;
  img: string;
  price: number;
  category?: string;
  createdAt: number;
}

const App = (): JSX.Element => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [main, setMain] = useState<List[]>([]);
  const [ListDatas, setListDatas] = useState<IListData[]>([]);

  const [userlogin, setUserLogin] = useState<boolean>(false);
  const [userDatas, setUserDatas] = useState<IUserDatas>(errUserDatas);
  const obServerOn = useRecoilValue(mainobserver);
  const setObserverOn = useSetRecoilState(mainobserver);

  //func

  const getmain = useMutation({
    mutationKey: "getmain",
    mutationFn: async (idxValue: number) => {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/main`,
        { idx: idxValue },
        { withCredentials: true }
      );

      const products = data;
      console.log(products);

      const product = products.product;
      const lastdata = product?.map((item: IData) => {
        const listdata = {
          id: item.id,
          title: item.title,
          img: item.image
            ? `${process.env.REACT_APP_SERVER_URL}/imgs/${item.image[0]}`
            : "/imgs/hamster.png",
          price: item.price,
          createdAt: Math.floor(
            (+new Date() - +new Date(item.createdAt || new Date() + "")) /
              (1000 * 60 * 60 * 24)
          ),
        };
        return listdata;
      });
      return lastdata;
    },

    onSuccess(data) {
      if (data.length === 0) {
        setObserverOn(false);
      } else {
        setObserverOn(true);
      }
    },
  });

  const idxValue = useMemo(() => {
    return getmain.data?.length;
  }, [ListDatas]);

  console.log(getmain.data);

  const userDataCheck = useCallback(async () => {
    await axios
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
  }, []);

  //mount

  useEffect(() => {
    userDataCheck();
    getmain.mutate(idxValue);
  }, []);

  useEffect(() => {
    if (userlogin) userDataCheck();
  }, [userlogin]);

  return (
    <div>
      <div>
        <Layout
          mainDataGet={getmain.mutate}
          userDatas={userDatas}
          setUserLogin={setUserLogin}
          userlogin={userlogin}
          main={getmain.data}
          userDataCheck={userDataCheck}
          obToggleValue={obServerOn}
          dataCheckIdxValue={idxValue}
          setListDatas={setListDatas}
        />
      </div>
    </div>
  );
};

export default App;
