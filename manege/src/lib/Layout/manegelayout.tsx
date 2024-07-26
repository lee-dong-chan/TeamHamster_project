import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ManegeReport from "../../page/manege/report";
import ManegeCategory from "../../page/manege/category";
import ManegeBenKeyword from "../../page/manege/benkeyword";
import ManegeUser from "../../page/manege/user";
import ManegePoint from "../../page/manege/point";
import ManegeDeliveryTip from "../../page/manege/deliverytip";
import ManegePageCategory from "../../Component/Category/ManegePageCategory";

import { TinyButton } from "../../Component/Button/Button";
import { box, center } from "../styles";
import { Button } from "../Button/Button";
import Authority from "../../page/manege/authority";
import LoginPage from "../../page/manege/adminlogin";
import AdminLoginPage from "../../page/manege/adminlogin";
import { useCallback, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

interface IUser {
  id: number;
  nick: string;
  point: number;
  admin: boolean;
  delivery: boolean;
}

interface IProps {}

const ManegeLayout = ({}: IProps): JSX.Element => {
  const [userlogin, setUserLogin] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const onclick = () => {
    window.location.replace("http://localhost:3000/");
  };

  const onlogout = () => {
    logout.mutate();
    window.location.replace("http://localhost:8000//manege/login");
  };

  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const logcheck = useMutation({
    mutationKey: "userlogin",
    mutationFn: async () => {
      const { data } = await axios.post(
        `${serverUrl}/layout`,
        {},
        { withCredentials: true }
      );
      return data;
    },
  });

  const logout = useMutation({
    mutationKey: "userlogout",
    mutationFn: async () => {
      await axios.post(`${serverUrl}/logout`, {}, { withCredentials: true });
    },
  });

  const log: IUser = logcheck.data?.login;

  useEffect(() => {
    logcheck.mutate();
  }, []);
  useEffect(() => {}, [userlogin]);

  return (
    <div>
      <div>
        <div className="p-1 h-[6rem] bg-orange-600">
          <div className={`${box} h-[100%] flex justify-between items-center `}>
            <div className={`${center}`}>
              <img src="/imgs/hamster.png" className="h-[4rem]"></img>
              <div>
                <div className="text-[2rem] text-white font-bold">
                  햄스터마켓
                </div>
                <div className="text-[1rem] text-white font-bold">
                  관리자 페이지
                </div>
              </div>
            </div>
            <div className={`${center} gap-3`}>
              <div className="h-[3rem] w-[3rem]">
                <img className="h-[100%]" src="/imgs/good.png"></img>
              </div>
              <div
                className={`text-white ${log?.nick ? "w-[7rem]" : "w-[2rem]"} `}
              >
                {log?.admin && `${log?.nick}`}
              </div>
              {log?.admin ? (
                <div className="flex gap-2">
                  <div onClick={onclick}>
                    <div className="p-1 border bg-orange-200 rounded">
                      메인페이지
                    </div>
                  </div>
                  <div onClick={onlogout}>
                    <div className="p-1 border bg-blue-200 rounded">
                      로그아웃
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-white">관리자로그인이 필요합니다</div>
              )}
            </div>
          </div>
        </div>

        <div>
          {log?.admin ? (
            <div>
              <ManegePageCategory />
              <Routes>
                <Route
                  path="/manege/login"
                  element={<AdminLoginPage setUserLogin={setUserLogin} />}
                />
                <Route path="/manege/report" element={<ManegeReport />} />
                <Route path="/manege/category" element={<ManegeCategory />} />
                <Route path="/manege/keyword" element={<ManegeBenKeyword />} />
                <Route path="/manege/user" element={<ManegeUser />} />
                <Route path="/manege/point" element={<ManegePoint />} />
                <Route
                  path="/manege/delivery"
                  element={<ManegeDeliveryTip />}
                />
                <Route path="/manege/authority" element={<Authority />} />
              </Routes>
            </div>
          ) : (
            <AdminLoginPage setUserLogin={setUserLogin} />
          )}
        </div>

        <div className="border border-t border-b">
          <div className={`${box} ${center} py-[1rem]text-gray-400 `}>
            <div>팀이름</div>
            <div className="mx-[1.5rem] h-[1rem] border border-[1px] border-gray-200 "></div>
            <div>프로젝트 이름</div>
            <div className="mx-[1.5rem] h-[1rem] border border-[1px] border-gray-200 "></div>

            <div>팀원명단</div>
            <div className="mx-[1.5rem] h-[1rem] border border-[1px] border-gray-200 "></div>

            <div>담당영역</div>
            <div className="mx-[1.5rem] h-[1rem] border border-[1px] border-gray-200 "></div>

            <div>깃주소</div>
          </div>
        </div>
      </div>
      {/* {
        <div className="absolute z-40 top-0 h-[100%] w-[100%] bg-black opacity-[0.2]">
          <div className="">123</div>
        </div>
      } */}
    </div>
  );
};

export default ManegeLayout;
