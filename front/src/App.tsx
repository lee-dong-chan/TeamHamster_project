import { useCallback, useEffect, useMemo, useState } from "react";
import Layout from "./lib/Layout/layout";

import axios, { AxiosResponse } from "axios";
import { IUserDatas } from "./lib/interFace";
import { errUserDatas } from "./lib/errors";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IData } from "./page/main/main";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { mainobserver } from "./Context/Modal";
import { keepPreviousData } from "@tanstack/react-query";

export interface IListData {
  id: number;
  title: string;
  img: string;
  price: number;
  category?: string;
  createdAt: number;
}

const App = (): JSX.Element => {
  const serverUrl = useMemo(() => process.env.REACT_APP_SERVER_URL, []);

  const setListDatas = useState<IListData[]>([])[1];

  const [userlogin, setUserLogin] = useState<boolean>(false);
  const [userDatas, setUserDatas] = useState<IUserDatas>(errUserDatas);
  const obServerOn = useRecoilValue(mainobserver);
  const setObserverOn = useSetRecoilState(mainobserver);

  //func
  const queryclient = useQueryClient();

  const getmain: any = useQuery({
    queryKey: ["getmain"],
    queryFn: async () => {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/main`,
        { idx: idxValue },
        { withCredentials: true }
      );

      const products = keepPreviousData(data);

      if (data.product.length === 0) {
        setObserverOn(false);
      } else {
        setObserverOn(true);
      }

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
      if (getmain.data && data.product[0] ? true : false) {
        return [...getmain.data, ...lastdata];
      } else if (getmain.data) {
        return getmain.data;
      } else {
        return lastdata;
      }
    },
    placeholderData: keepPreviousData,
  });

  const idxValue = useMemo(() => {
    return getmain.data?.length;
  }, [getmain.data?.length]);

  console.log(idxValue);

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
  }, [serverUrl]);

  //mount
  const mainDataGet = useCallback(() => {
    queryclient.invalidateQueries({ queryKey: ["getmain"] });
  }, [queryclient]);

  useEffect(() => {
    userDataCheck();
    mainDataGet();
  }, [userDataCheck, mainDataGet]);

  console.log("무한 돌기 체크");

  useEffect(() => {
    if (userlogin) userDataCheck();
  }, [userlogin, userDataCheck]);

  return (
    <div>
      <div>
        <Layout
          mainDataGet={mainDataGet}
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
