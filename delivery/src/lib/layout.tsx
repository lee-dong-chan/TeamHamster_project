import { useCallback, useEffect, useMemo, useState } from "react";

import { Link, Route, Routes } from "react-router-dom";
import { mobilebox } from "./styles";
import { IoIosHome } from "react-icons/io";
import { BsPersonFill } from "react-icons/bs";

import axios from "axios";
import Main from "../page/main";
import PickupScan from "../page/pickupscan";
import DeliveryScan from "../page/deliveryscan";
import PickupCheck from "../page/pickupcheck";
import PickUpList from "../page/pickuplist";

import SelectCamp from "../page/selectcamp";
import MyPage from "../page/mypage";
import DeliveryLoginPage from "../page/deliverylogin";
import { useMutation } from "react-query";
import { LuScanLine } from "react-icons/lu";
import ModalBox from "../Component/Modal/ModalBox";
import { useBreakPoint } from "../Costomhook/BreakPoint";
import { Modalcontent, Modalstate } from "../Context/Modal/Modal";
import { useRecoilValue, useSetRecoilState } from "recoil";

export interface IUser {
  id: number;
  nick: string;
  point: number;
  admin: boolean;
  delivery: boolean;
}

interface IDatas {
  login: IUser;
}

const LayOut = (): JSX.Element => {
  const setsystemonoff = useSetRecoilState(Modalstate);
  const setModalcontent = useSetRecoilState(Modalcontent);
  const systemModal = useRecoilValue(Modalstate);
  const { isdesktop, ismobile } = useBreakPoint();
  const setUserLogin = useState<boolean>(false)[1];
  const [camp, setcamp] = useState<string>("");
  const [workstate, SetWorkState] = useState<boolean>(false);
  const [liststate, SetListState] = useState(0);

  const [intervalGpsGet, setIntervalGpsGet] = useState<any>();

  //env
  const serverUrl = useMemo(() => process.env.REACT_APP_SERVER_URL, []);

  const start = useCallback(() => {
    SetWorkState(true);
  }, []);
  const end = useCallback(() => {
    SetWorkState(false);
  }, []);
  const saveList = useCallback((item: number) => {
    SetListState(item);
  }, []);
  const gpsToServer = useCallback(
    async (x: number, y: number) => {
      await axios
        .post(
          `${serverUrl}/delivery/nowspot`,
          {
            spotX: x,
            spotY: y,
          },
          { withCredentials: true }
        )
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
          console.log();
        });
    },
    [serverUrl]
  );

  //func

  const [x, setX] = useState<number>();
  const [y, setY] = useState<number>();
  const [gpsDidRes, setGpsDidRes] = useState<boolean>(true);

  const getGps = useCallback(async () => {
    if (gpsDidRes) {
      setGpsDidRes(false);
      navigator.geolocation.getCurrentPosition(
        (data: GeolocationPosition) => {
          const { latitude, longitude } = data.coords;
          const y: number = latitude;
          const x: number = longitude;
          console.log(x, y);
          setX(x);
          setY(y);
          setGpsDidRes(true);
        },
        (err) => {
          console.log("err", err);
          setGpsDidRes(true);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      console.log("아직 응답 안함");
    }
  }, [gpsDidRes]);

  const { data, isError, mutate } = useMutation({
    mutationKey: "userlogin",
    mutationFn: async () => {
      const { data }: { data: IDatas } = await axios.post(
        `${serverUrl}/layout`,
        {},
        { withCredentials: true }
      );
      return data as IDatas;
    },
  });

  const logcheck = useMemo(() => {
    return { data: data, isError: isError, mutate: mutate };
  }, [data, isError, mutate]);

  const logOut = async () => {
    await axios
      .post(`${serverUrl}/logout`, {}, { withCredentials: true })
      .then((data) => {
        setsystemonoff(true);
        setModalcontent("logout");
        console.log(data);
        setUserLogin(false);
      })
      .catch((err) => {
        setsystemonoff(true);
        setModalcontent("logoutfail");
        console.log("logout err", err);
      });
  };

  const log: IUser | undefined = useMemo(() => {
    if (logcheck.data?.login !== data) {
      return logcheck.data?.login;
    }
  }, [logcheck.data?.login, data]);

  //mount

  useEffect(() => {
    console.log("인터벌 이펙트");
    if (workstate) {
      console.log("gps 인터벌 시작");
      if (intervalGpsGet === undefined) {
        setIntervalGpsGet(setInterval(getGps, 3000));
      }
    } else {
      console.log("gps 인터벌 종료");
      setIntervalGpsGet(clearInterval(intervalGpsGet));
    }
  }, [workstate, intervalGpsGet, setIntervalGpsGet, getGps]);

  //
  useEffect(() => {
    if (x && y) gpsToServer(x, y);
  }, [x, y, gpsToServer]);

  useEffect(() => {
    mutate();
  }, [mutate]);

  return (
    <div className="h-[50rem] ">
      <div className="m-auto max-w-[35rem] h-[6rem] bg-blue-300">
        <div
          className={` ${mobilebox} h-[100%] flex items-center justify-between`}
        >
          <div className="flex">
            <div className="h-[3rem] w-[3rem] ">
              <img src="/imgs/hamster.png" alt="imgNotFoundOnReact"></img>
            </div>
            <div className="text-center text-[0.8rem] text-white font-bold">
              <div>햄스터마켓</div>
              <div>배송파트너</div>
            </div>
          </div>
          {log?.delivery ? (
            <div className="flex items-center">
              <div className="text-center text-white">
                <div>배송파트너</div>
                <div>{log?.nick} 님</div>
                {workstate && (
                  <div className="border rounded bg-yellow-400">업무중</div>
                )}
              </div>
              <div
                onClick={() => {
                  logOut();
                  window.location.reload();
                }}
                className="ms-2 p-1 border text-white rounded bg-blue-400"
              >
                로그아웃
              </div>
            </div>
          ) : (
            <div>로그인</div>
          )}
        </div>
      </div>

      <div>
        <div className="m-auto w-[35rem]">
          {log?.delivery ? (
            <div>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main start={start} end={end} workstate={workstate} />
                  }
                ></Route>
                <Route path="/pickupscan" element={<PickupScan />}></Route>
                <Route
                  path="/pickupcheck"
                  element={
                    <PickupCheck liststate={liststate} checklist={saveList} />
                  }
                ></Route>
                <Route
                  path="/selectcamp"
                  element={<SelectCamp setcamp={setcamp} />}
                ></Route>
                <Route
                  path="/pickuplist"
                  element={
                    <PickUpList liststate={liststate} checklist={saveList} />
                  }
                ></Route>
                <Route path="/deliveryscan" element={<DeliveryScan />}></Route>
                <Route
                  path="/mypage"
                  element={
                    <MyPage workstate={workstate} camp={camp} user={log} />
                  }
                ></Route>
              </Routes>
            </div>
          ) : (
            <div>
              <DeliveryLoginPage setUserLogin={setUserLogin} />
            </div>
          )}
        </div>
      </div>
      {systemModal && (
        <div
          className={`${isdesktop && "fixed top-[30%] start-[35%]  z-200"} ${
            ismobile && "fixed top-[30%] start-[10%]  z-200"
          }`}
        >
          <ModalBox />
        </div>
      )}
      <div className="m-auto max-w-[35rem] h-[5rem] flex items-center justify-evenly bg-gray-400 sticky bottom-0">
        <Link to={"/"}>
          <div className="flex flex-col items-center">
            <div>
              <IoIosHome size={30} />
            </div>
            <div>홈</div>
          </div>
        </Link>
        <Link to={"/deliveryscan"}>
          <div className="flex flex-col items-center">
            <div>
              <LuScanLine size={30} />
            </div>
            <div>배송완료스캔</div>
          </div>
        </Link>

        <Link to={"/pickupscan"}>
          <div className="flex flex-col items-center">
            <div>
              <LuScanLine size={30} />
            </div>
            <div>픽업상품 스캔</div>
          </div>
        </Link>
        <Link to={"/mypage"}>
          <div className="flex flex-col items-center">
            <div>
              <BsPersonFill size={30} />
            </div>
            <div>내정보</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LayOut;
