import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Search from "../../page/search/search";
import Main from "../../page/main/main";
import Category from "../../page/catgegory/category";
import Login from "../../page/account/login/login";
import Regist from "../../page/account/regist/regist";
import Point from "../../page/point/point";
import Product from "../../page/product/product";
import Sell from "../../page/sell/sell";
import MyStore from "../../page/mystore/mystore";

import { List } from "../list";
import NotLogin from "../../Component/LoginInfo/NotLogin";
import Maneger from "../../Component/LoginInfo/Maneger";
import { useEffect } from "react";

interface IProps {
  userlogin: boolean;
  main: List[];
  catepage: List[];
  searchpage: List[];
  setpage(): void;
}

const Layout = ({
  userlogin,
  main,
  catepage,
  searchpage,
  setpage,
}: IProps): JSX.Element => {
  const url = useLocation();
  const path = url.pathname.slice(8);
  console.log(path);
  const Navigator = useNavigate();
  const Mobile = () => {
    Navigator(`/${path}`);
  };
  const authority = true;
  useEffect(() => {
    Mobile();
  }, []);
  return (
    <div>
      <div className="p-1 h-[6rem] bg-orange-200">
        <div className="Box h-[100%] flex justify-between items-center ">
          <Link to={"/"}>
            <div className="Center">
              <img src="/imgs/hamster.png" className="h-[4rem]"></img>
              <div className="text-[2rem] text-white font-bold">햄스터마켓</div>
            </div>
          </Link>
          {!userlogin ? (
            <NotLogin />
          ) : !authority ? (
            <Login />
          ) : (
            <Maneger setpage={setpage} />
          )}
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Main list={main} />}></Route>
        <Route
          path="/category/:id"
          element={<Category list={catepage} />}
        ></Route>
        <Route
          path={`/search/:id`}
          element={<Search list={searchpage} />}
        ></Route>
        <Route path="/product/:id" element={<Product />}></Route>
        <Route path="/sell" element={<Sell />}></Route>
        <Route path="/mystore" element={<MyStore />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/regist" element={<Regist />}></Route>
        <Route path="/point" element={<Point />}></Route>
      </Routes>
      <div>
        <div className="border border-t border-b">
          <div className="py-[1rem] Box Center text-gray-400 ">
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
    </div>
  );
};

export default Layout;
