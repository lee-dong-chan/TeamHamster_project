import { useEffect, useState } from "react";
import { rowfont, center, outborder, nanoBtn } from "../../../../lib/styles";
import SellContent from "./sellContents";
import { IProduct, IProductRes } from "../../../../lib/interFace";
import Count from "../../../../Component/jabs/Count";
import axios, { AxiosResponse } from "axios";
import { sellContentsErr, buyContentsErr } from "../../../../lib/errors";
import { useLocation, useNavigate } from "react-router-dom";
import { useBreakPoint } from "../../../../CustomHook/BreakPoint";

interface IProps {
  value: number;
}

const SellComp = ({ value }: IProps) => {
  const { ismobile, isdesktop } = useBreakPoint();
  //State
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isBuyTap, setIsBuyTap] = useState<boolean>(false);

  //env
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  //values
  const loca = useLocation();
  const navigate = useNavigate();

  //funcs
  const getData = async (value: number) => {
    //판매상품
    if (value === 1) {
      await axios
        .post(
          `${serverUrl}/mysell${loca.search}`,
          {},
          { withCredentials: true }
        )
        .then((data: AxiosResponse) => {
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
          setProducts(products);
        })
        .catch(() => {
          setProducts(buyContentsErr);
        });
    }
  };

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
  }, [products]);

  return (
    <div className={`mt-4 w-[100%] min-w-[30rem] h-[90%]`}>
      {/* 탭 */}
      <div className={`flex justify-between`}>
        <Count text="상품" number={products.length}></Count>
        <div className={`p-3 grid`}>
          <div className="flex">
            {value === 1 && (
              <div
                onClick={moveToProductWrite}
                className={`${outborder} ${center} p-1 pl-4 pr-4`}
              >
                상품 등록
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 상품페이지 변환 */}
      <div
        className={`${
          isdesktop && "h-auto flex flex-nowrap overflow-x-scroll"
        } ${ismobile && "flex grid grid-cols-2"}`}
        style={{ scrollbarWidth: "none" }}
      >
        {/* 상품 */}
        {products.map((data: IProduct, idx: number) => {
          return <SellContent key={idx} data={data} isBuyTap={isBuyTap} />;
        })}
      </div>
    </div>
  );
};

export default SellComp;
