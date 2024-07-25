import { Link } from "react-router-dom";

import { Button } from "../../../lib/Button/Button";
import { TinyButton } from "../../Button/Button";
import MenuCategory from "./MenuCategory";
import { useQuery } from "react-query";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { Modal } from "../../../Context/Modal";
import { useEffect, useState } from "react";
import { useBreakPoint } from "../../../CustomHook/BreakPoint";
interface IUser {
  name: string;
  point: number;
}
interface IProps {}

const Menu = ({}: IProps): JSX.Element => {
  const { ismobile, isdesktop } = useBreakPoint();
  const pointBtn = new Button("포인트충전", "bg-orange-200");
  const myStore = new Button("내상점", "bg-orange-200");
  const Modalstate = useSetRecoilState(Modal);
  const [user, setUser] = useState<IUser | undefined>();
  // const userData = useQuery({
  //   queryKey: "menuuser",
  //   queryFn: async () => {

  //       const { data } = await axios.post(
  //         `${process.env.REACT_APP_SERVER_URL}/mystore`,
  //         { id: 1 },
  //         { withCredentials: true }
  //       );
  //       const userdata: IUser = { name: data.nick, point: data.point };
  //       return userdata;

  //   },
  // });

  useEffect(() => {
    if (isdesktop) {
      Modalstate(undefined);
    }
  }, [isdesktop]);

  // useEffect(() => {
  //   if (userData.data !== undefined) {
  //     setUser(userData.data);
  //   }
  // }, []);
  return (
    <div className="MobileBox">
      <div className="flex items-center justify-between">
        <div>
          <div>{user?.name} 님</div>
          <div>
            현재 보유포인트:
            <span className="text-orange-300">{user?.point}</span>포인트
          </div>
        </div>
        <div className="flex gap-2">
          <Link to={"/point"}>
            <div>
              <TinyButton btn={pointBtn} />
            </div>
          </Link>
          <Link to={"/mystore"}>
            <div>
              <TinyButton btn={myStore} />
            </div>
          </Link>
        </div>
      </div>
      <div className="py-3">
        <div className="text-[1.2rem] font-bold">추천 목록 선택</div>
        <MenuCategory />
      </div>
      <div></div>
    </div>
  );
};

export default Menu;
