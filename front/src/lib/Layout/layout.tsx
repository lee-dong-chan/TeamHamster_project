import { Link, Route, Routes, useLocation } from "react-router-dom";
import Search from "../../page/search/search";
import Main from "../../page/main/main";
import Category from "../../page/catgegory/category";

import Point from "../../page/point/point";
import Product from "../../page/product/product";

import MyStore from "../../page/mystore/mystore";
import LoginPage from "../../page/account/login/loginpage";
import ProductWrite from "../../page/sell/ProductWrite";
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

import { useEffect, useState } from "react";
import MobileModal from "../../Component/Modal/ModalBox/Modal";
import { box, center } from "../styles";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Modal } from "../../Context/Modal";
import Regist from "../../page/account/regist/registpage";
import { IUserDatas } from "../interFace";
import { GoogleCallback } from "../../Component/OAuth/GoogleOAuth";
import { NaverCallback } from "../../Component/OAuth/NaverOAuth";
import { IListData } from "../../App";
import { IList } from "../../Component/List/ListItem";
import { Modalstate } from "../../Context/SystemModal/Modal";
import ModalBox from "../../Component/Modal/SystemModal/ModalBox";
import FindID from "../../page/account/findid/findID";
import FindPW from "../../page/account/findpw/findPW";

interface IProps {
  setUserLogin: React.Dispatch<React.SetStateAction<boolean>>;
  userlogin: boolean;
  main: IList[];
  userDatas: IUserDatas;
  userDataCheck: () => void;
  dataCheckIdxValue: number;
  mainDataGet: (i: number) => void;
  setListDatas: (i: IListData[]) => void;
  obToggleValue: boolean;
}

const Layout = ({
  userDatas,
  setUserLogin,
  userlogin,
  main,
  userDataCheck,
  mainDataGet,
  setListDatas,
  dataCheckIdxValue,
  obToggleValue,
}: IProps): JSX.Element => {
  const [value, setValue] = useState<number>(0);
  const [isReview, setIsReview] = useState<boolean>(true);
  const { isdesktop, ismobile } = useBreakPoint();
  const getModal = useRecoilState(Modal);
  const setModal = useSetRecoilState(Modal);

  const systemModal = useRecoilValue(Modalstate);
  const openmenu = () => {
    setModal("mobilemenu");
  };
  const location = useLocation();
  useEffect(() => {
    setModal(undefined);
  }, [location, setModal]);

  const valueChanger = (value: number) => {
    setValue(value);
    if (value === 0) {
      setIsReview(true);
    } else {
      setIsReview(false);
    }
  };

  return (
    <div>
      <div className="relative h-[100%] ">
        <div className="p-1 h-[6rem] bg-orange-200">
          <div className={`${box} h-[100%] flex justify-between items-center`}>
            <div className={`${center}`}>
              {ismobile && (
                <div className="flex flex-col items-center" onClick={openmenu}>
                  <div>
                    <CgFormatJustify size={40} />
                  </div>
                  <div className="text-[0.8rem]">메뉴</div>
                </div>
              )}
              <Link to={"/"}>
                <img
                  alt="logo"
                  src="/imgs/hamster.png"
                  className="h-[4rem]"
                ></img>
              </Link>
              <div
                className={`${
                  isdesktop && "text-[2rem] text-white font-bold"
                } ${ismobile && "text-[1rem] text-white font-bold"}`}
              >
                햄스터마켓
              </div>
            </div>
            <div>
              {!userlogin && <NotLogin />}
              {userlogin &&
                (!userDatas.login?.admin ? (
                  <Login userDatas={userDatas} setUserLogin={setUserLogin} />
                ) : (
                  <Maneger userDatas={userDatas} />
                ))}
            </div>
          </div>
        </div>
        {/* 상단 */}
        <div>
          {ismobile && getModal[0] !== undefined ? (
            <div></div>
          ) : (
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    idxValue={dataCheckIdxValue}
                    list={main}
                    mainDataGet={mainDataGet}
                    obToggleValue={obToggleValue}
                  />
                }
              ></Route>
              <Route
                path="/GoogleLoding"
                element={<GoogleCallback setUserLogin={setUserLogin} />}
              ></Route>
              <Route
                path="/NaverLoding"
                element={<NaverCallback setUserLogin={setUserLogin} />}
              ></Route>
              <Route path="/category/:id" element={<Category />}></Route>
              <Route path={`/search/:id`} element={<Search />}></Route>
              <Route
                path="/product/:id"
                element={
                  <Product mainDataGet={setListDatas} userdata={userDatas} />
                }
              ></Route>
              <Route
                path="/sell"
                element={
                  <ProductWrite
                    mainDataGet={mainDataGet}
                    dataCheckIdxValue={dataCheckIdxValue}
                  />
                }
              ></Route>
              <Route
                path="/sell/:id"
                element={
                  <ProductWrite
                    mainDataGet={mainDataGet}
                    dataCheckIdxValue={dataCheckIdxValue}
                  />
                }
              ></Route>
              <Route
                path="/mystore"
                element={
                  <MyStore
                    userlogin={userlogin}
                    value={value}
                    setvalue={setValue}
                    isReview={isReview}
                    setIsReview={setIsReview}
                    valueChanger={valueChanger}
                  />
                }
              ></Route>
              <Route
                path="/login"
                element={<LoginPage setUserLogin={setUserLogin} />}
              ></Route>
              <Route path="/findID" element={<FindID />}></Route>
              <Route path="/findPW" element={<FindPW />}></Route>
              <Route path="/regist" element={<Regist />}></Route>
              <Route
                path="/point"
                element={
                  <Point
                    points={userDatas.login?.point ? userDatas.login.point : 0}
                    userDataCheck={userDataCheck}
                  />
                }
              ></Route>
            </Routes>
          )}
          <div>
            {getModal[0] !== undefined && (
              <MobileModal
                setUserLogin={setUserLogin}
                userlogin={userlogin}
                userDatas={userDatas}
                userDataCheck={userDataCheck}
              />
            )}
            {systemModal && (
              <div
                className={`${
                  isdesktop && "fixed top-[30%] start-[35%]  z-200"
                } ${ismobile && "fixed top-[30%] start-[10%]  z-200"}`}
              >
                <ModalBox />
              </div>
            )}
          </div>
        </div>
        {/* 하단 */}
        {isdesktop && (
          <div>
            <div className="border border-t border-b">
              <div className={`${box} ${center} py-[1rem]  text-gray-400 `}>
                <div>팀이름</div>
                <div className="mx-[1.5rem] h-[1rem] border-[1px] border-gray-200 "></div>
                <div>프로젝트 이름</div>
                <div className="mx-[1.5rem] h-[1rem] border-[1px] border-gray-200 "></div>

                <div>팀원명단</div>
                <div className="mx-[1.5rem] h-[1rem] border-[1px] border-gray-200 "></div>

                <div>담당영역</div>
                <div className="mx-[1.5rem] h-[1rem] border-[1px] border-gray-200 "></div>

                <div>깃주소</div>
              </div>
            </div>
          </div>
        )}
        {userlogin
          ? ismobile &&
            getModal[0] === undefined && (
              <div className=" h-[6em] sticky flex justify-evenly items-center  bg-gray-300 border border-t bottom-0">
                <Link to={"/"}>
                  <div className="flex flex-col items-center ">
                    <IoHome size={30} />
                    <div>홈</div>
                  </div>
                </Link>
                <Link to={`/mystore?id=${userDatas.login?.id}`}>
                  <div
                    className="flex flex-col items-center "
                    onClick={() => {
                      valueChanger(2);
                    }}
                  >
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
                <Link to={`/mystore?id=${userDatas.login?.id}`}>
                  <div
                    className="flex flex-col items-center "
                    onClick={() => {
                      valueChanger(1);
                    }}
                  >
                    <MdOutlineShoppingBag size={30} />
                    <div>판매상품</div>
                  </div>
                </Link>
                <Link to={`/mystore?id=${userDatas.login?.id}`}>
                  <div
                    className="flex flex-col items-center"
                    onClick={() => {
                      valueChanger(0);
                    }}
                  >
                    <IoAccessibility size={30} />
                    <div>내상점</div>
                  </div>
                </Link>
              </div>
            )
          : ismobile &&
            getModal[0] === undefined && (
              <div className=" h-[6em] sticky flex justify-evenly items-center  bg-gray-300 border border-t bottom-0">
                <Link to={"/"}>
                  <div className="flex flex-col items-center ">
                    <IoHome size={30} />
                    <div>홈</div>
                  </div>
                </Link>

                <div
                  className="flex flex-col items-center "
                  onClick={() => {
                    valueChanger(2);
                  }}
                >
                  <BiPurchaseTag size={30} />
                  <div>구매상품</div>
                </div>

                <div className="flex flex-col items-center ">
                  <CgAdd size={30} />
                  <div>등록</div>
                </div>

                <div
                  className="flex flex-col items-center "
                  onClick={() => {
                    valueChanger(1);
                  }}
                >
                  <MdOutlineShoppingBag size={30} />
                  <div>판매상품</div>
                </div>

                <div
                  className="flex flex-col items-center"
                  onClick={() => {
                    valueChanger(0);
                  }}
                >
                  <IoAccessibility size={30} />
                  <div>내상점</div>
                </div>
              </div>
            )}
      </div>
    </div>
  );
};

export default Layout;
