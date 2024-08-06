import { useCallback, useEffect, useMemo, useState } from "react";
import { center } from "../../../../lib/styles";
import SellContent from "./sellContents";
import { IProduct, IProductRes } from "../../../../lib/interFace";
import Count from "../../../../Component/jabs/Count";
import axios, { AxiosResponse } from "axios";
import { sellContentsErr, buyContentsErr } from "../../../../lib/errors";
import { useLocation, useNavigate } from "react-router-dom";
import { useBreakPoint } from "../../../../CustomHook/BreakPoint";
import Notitem from "../../../../Component/Notitem/Notitem";

interface IProps {
  value: number;
}

const SellComp = ({ value }: IProps) => {
  const { ismobile, isdesktop } = useBreakPoint();
  //State
  const [notitem, setnotitem] = useState<boolean>(true);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isBuyTap, setIsBuyTap] = useState<boolean>(false);

  //env
  const serverUrl = useMemo(() => process.env.REACT_APP_SERVER_URL, []);

  //values
  const loca = useLocation();
  const navigate = useNavigate();

  //funcs
  const getData = useCallback(
    async (value: number) => {
      //판매상품
      if (value === 1) {
        await axios
          .post(
            `${serverUrl}/mysell${loca.search}`,
            {},
            { withCredentials: true }
          )
          .then((data: AxiosResponse) => {
            console.log(data);
            const res: IProductRes = data.data;
            const products: IProduct[] = res.product.rows;
            setProducts(products);
          })
          .catch(() => {
            setProducts(sellContentsErr);
          });
      }

      //구매상품
      if (value === 2) {
        await axios
          .post(
            `${serverUrl}/mypurchase${loca.search}`,
            {},
            { withCredentials: true }
          )
          .then((data: AxiosResponse) => {
            const res: IProductRes = data.data;
            const products: IProduct[] = res.product.rows;
            console.log(products, "프로덕트들");
            setProducts(products);
          })
          .catch(() => {
            setProducts(buyContentsErr);
          });
      }
    },
    [loca, serverUrl]
  );

  const moveToProductWrite = () => {
    navigate("/sell");
  };

  //use
  useEffect(() => {
    setProducts([]);
  }, [value]);

  useEffect(() => {
    getData(value);
    if (value === 2) {
      setIsBuyTap(true);
    } else {
      setIsBuyTap(false);
    }
  }, [value, getData]);

  useEffect(() => {
    if (!products.length) {
      setnotitem(false);
    }
  }, [value, products]);

  console.log("마이스토어 판매 무한 돌기 체크");

  return (
    <div>
      <div
        className={
          isdesktop
            ? `mt-4 p-3 w-[100%] min-w-[35rem] h-[90%] border overflow-auto`
            : ""
        }
      >
        {/* 탭 */}
        <div className={`flex justify-between overflow-auto`}>
          <Count text="상품" number={products.length}></Count>
          <div className={`p-3 grid`}>
            <div className="flex">
              {value === 1 && (
                <div
                  onClick={moveToProductWrite}
                  className={` ${center} p-1 pl-4 pr-4 border rounded bg-blue-100 text-gray-500`}
                >
                  상품 등록
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 상품페이지 변환 */}
        {notitem && <Notitem />}
        <div className="flex justify-start">
          {!notitem && (
            <div
              className={`${isdesktop && " ms-4 flex h-[33rem] flex-wrap "} ${
                ismobile && " ms-4 grid grid-cols-2 overflow-auto  h-[35rem] "
              }`}
              style={{ scrollbarWidth: "none" }}
            >
              {/* 상품 */}
              {products.map((data: IProduct, idx: number) => {
                return (
                  <SellContent
                    key={idx}
                    data={data}
                    isBuyTap={isBuyTap}
                    value={value}
                    getData={getData}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellComp;
