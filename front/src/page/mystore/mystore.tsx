import { useCallback, useEffect, useMemo, useState } from "react";
import Intro from "./Intro/Intro";
import Content from "./Intro/content";
import { box, center, mobilebox } from "../../lib/styles";
import { IMyStoreRes } from "../../lib/interFace";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useBreakPoint } from "../../CustomHook/BreakPoint";

const serverUrl = process.env.REACT_APP_SERVER_URL;

interface IProps {
  userlogin: boolean;
  value: number;
  isReview: boolean;
  setvalue: React.Dispatch<React.SetStateAction<number>>;
  setIsReview: React.Dispatch<React.SetStateAction<boolean>>;
  valueChanger: (value: number) => void;
}

const MyStore = ({
  userlogin,
  value,
  setvalue,
  isReview,
  valueChanger,
}: IProps): JSX.Element => {
  const { isdesktop, ismobile } = useBreakPoint();
  const [storeName, setStoreName] = useState<string>("오류따봉스터");
  const [storePoint, setStorePoint] = useState<number>(0);
  const [storeIntro, setStoreIntro] = useState<string>(
    "이게 보인다면 무언가 오류가 있습니다. 콘솔을 확인하세요"
  );
  const [storeStar, setStoreStar] = useState<number>(0);
  const [storePFImg, setStorePFImg] = useState<string>("good.png");
  const [sellCount, setSellCount] = useState<number>(0);
  const [loginCheck, setLoginCheck] = useState<boolean>(false);
  const [reCheck] = useState<boolean>(false);

  const loca = useLocation();

  const getPageValues = useCallback(async () => {
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
  }, [loca]);

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
  }, [userlogin, reCheck, getPageValues]);

  console.log("마이스토어 무한돌기 체크");

  return (
    <div
      className={`${isdesktop && `${box} ${center} flex-wrap mt-10`} ${
        ismobile && `${mobilebox} ${center} flex-wrap mt-10`
      }`}
    >
      <Intro intro={intro} getPageValues={getPageValues}></Intro>

      <Content
        loginCheck={loginCheck}
        value={value}
        setValue={setvalue}
        isReview={isReview}
        valueChanger={valueChanger}
      ></Content>
    </div>
  );
};

export default MyStore;
