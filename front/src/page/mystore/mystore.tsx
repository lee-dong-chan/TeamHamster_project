import { useEffect, useMemo, useState } from "react";
import Intro from "./Intro/Intro";
import Content from "./Intro/content";
import { center } from "../../lib/styles";
import { IMyStoreRes } from "../../lib/interFace";
import axios from "axios";
import { useLocation } from "react-router-dom";

const serverUrl = process.env.REACT_APP_SERVER_URL;

interface IProps {
  userlogin: boolean;
}

const MyStore = ({ userlogin }: IProps): JSX.Element => {
  const [storeName, setStoreName] = useState<string>("오류따봉스터");
  const [storePoint, setStorePoint] = useState<number>(0);
  const [storeIntro, setStoreIntro] = useState<string>(
    "이게 보인다면 무언가 오류가 있습니다. 콘솔을 확인하세요"
  );
  const [storeStar, setStoreStar] = useState<number>(0);
  const [storePFImg, setStorePFImg] = useState<string>("good.png");
  const [sellCount, setSellCount] = useState<number>(0);
  const [loginCheck, setLoginCheck] = useState<boolean>(false);
  const [reCheck, setReCheck] = useState<boolean>(false);

  const loca = useLocation();

  const getPageValues = async () => {
    const serverCall = serverUrl + "/mystore" + loca.search;
    await axios
      .post(serverCall, {}, { withCredentials: true })
      .then(({ data }: { data: IMyStoreRes }): void => {
        setStoreName(data.store.nick);
        setStorePoint(data.store.point);
        setStoreIntro(data.store.Introduction);
        setStoreStar(data.store.star.star);
        setStorePFImg(data.store.profileimg);
        setSellCount(data.store.sellCount);
        setLoginCheck(data.loginuser);
      })
      .catch((error) => {
        // console.log(error);
        setStoreName("앙 에러띠");
        setStoreStar(3.5);
      });
  };

  const intro = useMemo(() => {
    return {
      storeName: storeName,
      storePoint: storePoint,
      storeIntro: storeIntro,
      storeStar: storeStar,
      storePFImg: storePFImg,
      sellCount: sellCount,
      loginCheck: loginCheck,
    };
  }, [
    storeName,
    storePoint,
    storeIntro,
    storeStar,
    storePFImg,
    sellCount,
    loginCheck,
  ]);
  //

  //

  //mount
  useEffect(() => {
    getPageValues();
  }, [userlogin, reCheck]);

  useEffect(() => {
    getPageValues();
  }, []);

  return (
    <div className={`${center} flex-wrap`}>
      <Intro intro={intro} getPageValues={getPageValues}></Intro>

      <Content loginCheck={loginCheck}></Content>
    </div>
  );
};

export default MyStore;
