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
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
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
  const navigate = useNavigate();
  const onclick = () => {
    window.location.replace("http://localhost:3000/");
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

  const log: IUser = logcheck.data?.login;

  const cate = useLocation().pathname.slice(8);

  useEffect(() => {
    logcheck.mutate();
  }, []);
  useEffect(() => {}, [userlogin]);
  const btn = new Button("메인페이지", "bg-orange-200");
  return (
    <div>
      <div className="p-1 h-[6rem] bg-orange-600">
        <div className={`${box} h-[100%] flex justify-between items-center `}>
          <div className={`${center}`}>
            <img src="/imgs/hamster.png" className="h-[4rem]"></img>
            <div>
              <div className="text-[2rem] text-white font-bold">햄스터마켓</div>
              <div className="text-[1rem] text-white font-bold">
                관리자 페이지
              </div>
            </div>
          </div>
          <div className={`${center} gap-3`}>
            <div className="h-[3rem] w-[3rem]">
              <img className="h-[100%]" src="/imgs/good.png"></img>
            </div>
            <div className="text-white w-[7rem]">
              {log?.nick && `${log?.nick}`}
            </div>
            <div onClick={onclick}>
              <TinyButton btn={btn} />
            </div>
          </div>
        </div>
      </div>

      <div>
        {log?.nick ? (
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
              <Route path="/manege/delivery" element={<ManegeDeliveryTip />} />
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
  );
};

export default ManegeLayout;
