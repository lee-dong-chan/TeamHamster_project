import { Link } from "react-router-dom";

import { Button } from "../../../lib/Button/Button";
import { TinyButton } from "../../Button/Button";
import MenuCategory from "./MenuCategory";
import { useQuery } from "react-query";
import axios, { AxiosResponse } from "axios";
import { useSetRecoilState } from "recoil";
import { Modal } from "../../../Context/Modal";
import { useEffect, useState } from "react";
import { useBreakPoint } from "../../../CustomHook/BreakPoint";
import { IUserDatas } from "../../../lib/interFace";
import { errUserDatas } from "../../../lib/errors";
import { mobilebox } from "../../../lib/styles";

interface IProps {
  setUserLogin: React.Dispatch<React.SetStateAction<boolean>>;
  userlogin: boolean;
  userDatas: IUserDatas;
  userDataCheck: () => void;
}

const Menu = ({
  setUserLogin,
  userlogin,
  userDatas,
  userDataCheck,
}: IProps): JSX.Element => {
  const { ismobile, isdesktop } = useBreakPoint();
  const logoutBtn = new Button("로그아웃", "bg-orange-200");
  const pointBtn = new Button("포인트충전", "bg-orange-200");
  const myStore = new Button("내상점", "bg-orange-200");
  const Modalstate = useSetRecoilState(Modal);
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const logOut = async () => {
    await axios
      .post(`${serverUrl}/logout`, {}, { withCredentials: true })
      .then((data) => {
        console.log(data);
        setUserLogin(false);
      })
      .catch((err) => {
        console.log("logout err", err);
      });
  };

  const { admin, delivery, id, nick, point } = userDatas.login
    ? userDatas.login
    : errUserDatas.login;

  useEffect(() => {
    if (isdesktop) {
      Modalstate(undefined);
    }
  }, [isdesktop]);

  useEffect(() => {
    userDataCheck();
  }, []);
  return (
    <div className={`${mobilebox}`}>
      {userlogin && (
        <div className="flex items-center justify-between">
          <div>
            <div>{nick} 님</div>
            <div>
              현재 보유포인트:
              <span className="text-orange-300">{point}</span>포인트
            </div>
          </div>

          <div className="flex gap-2">
            <Link to={"/point"}>
              <div>
                <TinyButton btn={pointBtn} />
              </div>
            </Link>
            <Link to={`/mystore?id=${id}`}>
              <div>
                <TinyButton btn={myStore} />
              </div>
            </Link>
            <div onClick={logOut}>
              <TinyButton btn={logoutBtn} />
            </div>
          </div>
        </div>
      )}
      <div className="py-3">
        <div className="text-[1.2rem] font-bold">추천 목록 선택</div>
        <MenuCategory />
      </div>
      <div></div>
    </div>
  );
};

export default Menu;
