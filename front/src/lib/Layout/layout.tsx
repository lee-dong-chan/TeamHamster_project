import { Link, Route, Routes } from "react-router-dom";
import Search from "../../page/search/search";
import Main from "../../page/main/main";
import Category from "../../page/catgegory/category";

import Regist from "../../page/account/regist/regist";
import Point from "../../page/point/point";
import Product from "../../page/product/product";
import Sell from "../../page/sell/sell";
import MyStore from "../../page/mystore/mystore";

import { List } from "../list";
import NotLogin from "../../Component/LoginInfo/NotLogin";
import Maneger from "../../Component/LoginInfo/Maneger";
import Login from "../../Component/LoginInfo/Login";

import { useBreakPoint } from "../../CustomHook/BreakPoint";
import { CgFormatJustify } from "react-icons/cg";
import { IoHome } from "react-icons/io5";
import { BiPurchaseTag } from "react-icons/bi";
import { CgAdd } from "react-icons/cg";
import { MdOutlineShoppingBag } from "react-icons/md";
import { IoAccessibility } from "react-icons/io5";
import LoginPage from "../../page/account/login/login";
import { useCallback, useEffect, useState } from "react";
import MobileModal from "../../Component/Mobile/Modal/MobileModal";
import { box, center } from "../styles";
import WebModal from "../../Component/Mobile/Modal/WebModal";

interface IProps {
  userlogin: boolean;
  main: List[];
  catepage: List[];
  searchpage: List[];
}

const Layout = ({
  userlogin,
  main,
  catepage,
  searchpage,
}: IProps): JSX.Element => {
  const { isdesktop, ismobile } = useBreakPoint();
  const authority = false;
  const [Webmodal, setWebModal] = useState(false);
  const [mobilemodal, setMobileModal] = useState(false);
  const [ModalContent, setModalContent] = useState<string>();
  //WebModal
  const ReportModalOn = useCallback(() => {
    setModalContent("report");
    setWebModal(true);
  }, []);
  const BuyModalOn = useCallback(() => {
    setModalContent("buy");
    setWebModal(true);
  }, []);
  const ReviewModalOn = useCallback(() => {
    setModalContent("review");
    setWebModal(true);
  }, []);
  const ModalOff = useCallback(() => {
    setWebModal(false);
  }, []);
  //MobileModal
  const MobileMenuOn = useCallback(() => {
    setMobileModal(true);
    setModalContent("menu");
  }, []);
  const MobileSearchOn = useCallback(() => {
    setMobileModal(true);
    setModalContent("search");
  }, []);
  const MobileReportModalOn = useCallback(() => {
    setModalContent("report");
    setMobileModal(true);
  }, []);
  const MobileBuyModalOn = useCallback(() => {
    setModalContent("buy");
    setMobileModal(true);
  }, []);
  const MobileModalOff = useCallback(() => {
    setMobileModal(false);
  }, []);

  useEffect(() => {
    setWebModal(false);
  }, [ismobile]);
  useEffect(() => {
    setMobileModal(false);
  }, [isdesktop]);
  return (
    <div>
      <div className="relative">
        <div className="p-1 h-[6rem] bg-orange-200">
          <div className={`${box} h-[100%] flex justify-between items-center`}>
            <div className={`${center}`}>
              {ismobile && (
                <div
                  className="flex flex-col items-center"
                  onClick={MobileMenuOn}
                >
                  <div>
                    <CgFormatJustify size={40} />
                  </div>
                  <div className="text-[0.8rem]">메뉴</div>
                </div>
              )}
              <Link to={"/"}>
                <img src="/imgs/hamster.png" className="h-[4rem]"></img>
              </Link>
              <div
                className={`${
                  isdesktop && "text-[2rem] text-white font-bold"
                } ${ismobile && "text-[1rem] text-white font-bold"}`}
              >
                햄스터마켓
              </div>
            </div>

            {!userlogin ? (
              <NotLogin />
            ) : !authority ? (
              <Login ModalOn={MobileSearchOn} />
            ) : (
              <Maneger />
            )}
          </div>
        </div>
        {!mobilemodal ? (
          <div>
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
              <Route
                path="/product/:id"
                element={
                  <Product
                    buymodal={BuyModalOn}
                    reportmodal={ReportModalOn}
                    mobilereport={MobileReportModalOn}
                    mobilebuy={MobileBuyModalOn}
                  />
                }
              ></Route>
              <Route path="/sell" element={<Sell />}></Route>
              <Route path="/mystore" element={<MyStore />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/regist" element={<Regist />}></Route>
              <Route path="/point" element={<Point />}></Route>
            </Routes>
            {Webmodal && isdesktop && (
              <div className="absolute top-40 start-80 ">
                <WebModal ModalOff={ModalOff} />
              </div>
            )}
          </div>
        ) : (
          <div>
            {ismobile && mobilemodal && (
              <MobileModal
                ModalOff={MobileModalOff}
                ModalContent={ModalContent}
              />
            )}
          </div>
        )}
        {isdesktop && (
          <div>
            <div className="border border-t border-b">
              <div className={`${box} ${center} py-[1rem]  text-gray-400 `}>
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
        )}
        {ismobile && !mobilemodal && (
          <div className="h-[6em] flex justify-evenly items-center sticky bottom-0 bg-gray-300 border border-t">
            <Link to={"/"}>
              <div className="flex flex-col items-center ">
                <IoHome size={30} />
                <div>홈</div>
              </div>
            </Link>
            <Link to={"/mystore"}>
              <div className="flex flex-col items-center ">
                <BiPurchaseTag size={30} />
                <div>구매상품</div>
              </div>
            </Link>
            <Link to={"/sell"}>
              <div className="flex flex-col items-center ">
                <CgAdd size={30} />
                <div>등록</div>
              </div>
            </Link>
            <Link to={"/mystore"}>
              <div className="flex flex-col items-center ">
                <MdOutlineShoppingBag size={30} />
                <div>판매상품</div>
              </div>
            </Link>
            <Link to={"/mystore"}>
              <div className="flex flex-col items-center ">
                <IoAccessibility size={30} />
                <div>내상점</div>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
