import { useSetRecoilState } from "recoil";
import ButtonComp, { LargeButton } from "../../Component/Button/Button";
import ProductInfo from "../../Component/Product/Product";
import { useBreakPoint } from "../../CustomHook/BreakPoint";
import { Button } from "../../lib/Button/Button";
import { box, center } from "../../lib/styles";
import { Modal, Modalproduct } from "../../Context/Modal";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { IProductPage, IUserDatas } from "../../lib/interFace";
import { productPageDataErr } from "../../lib/errors";
import { useCookies } from "react-cookie";
import { IListData } from "../../App";

interface IProps {
  userdata: IUserDatas;
  mainDataGet: (i: IListData[]) => void;
}

export interface IData<T> {
  product: T;
}

const serverUrl = process.env.REACT_APP_SERVER_URL;

const Product = ({ userdata, mainDataGet }: IProps): JSX.Element => {
  const { isdesktop, ismobile } = useBreakPoint();
  const [cookies, setCookie] = useCookies(["Product"]);
  const [, setproductlog] = useState("");
  const { id } = useParams();
  const btn = new Button("구매하기", "bg-orange-200");
  const ModalState = useSetRecoilState(Modal);
  const Modalproductitem = useSetRecoilState(Modalproduct);

  const [propData, setPropData] = useState<IProductPage>();

  const report = () => {
    ModalState("report");
  };
  const buy = () => {
    ModalState("buy");
  };

  const getDatas = useCallback(async () => {
    await axios
      .post(`${serverUrl}/product/${id}`, {}, { withCredentials: true })
      .then((data: AxiosResponse<IData<IProductPage>>) => {
        console.log("@@@@@@", data);
        const values = data.data.product;
        setPropData(values);
      })
      .catch((err) => {
        console.log(err);
        setPropData(productPageDataErr);
      });
  }, [id]);

  const handleCookie = useCallback(
    (product: string) => {
      const time = 3600; //1시간
      const expiration = new Date(Date.now() + time * 1000);
      setCookie(
        "Product",
        {
          product: product,
        },
        {
          path: "/",
          expires: expiration,
        }
      );
    },
    [setCookie]
  );

  useEffect(() => {
    if (id !== undefined) {
      setproductlog(id);
      Modalproductitem(id);
      getDatas();
    }
  }, [getDatas, id, Modalproductitem]);

  useEffect(() => {
    if (cookies.Product === undefined) {
      if (id !== undefined) {
        console.log(cookies);
        handleCookie(id);
      }
    } else {
      console.log("아이디체크", cookies, id);

      if (cookies.Product.product && id) {
        const a: string[] = cookies.Product.product.split("+");
        const set: Set<string> = new Set([...a]);
        const result: string[] = [];

        set.forEach((e) => {
          result.push(e);
        });

        console.log(result.indexOf(id));
        if (result.indexOf(id) !== -1) {
          return;
        } else {
          handleCookie(result.join("+") + "+" + id);
        }
      }
    }
  }, [handleCookie, id, cookies]);

  console.log("프로덕트 무한 돌기 체크");

  return (
    <div>
      <div className={`${box} ${center} relative`}>
        <div>
          {propData && (
            <ProductInfo
              mainDataGet={mainDataGet}
              data={propData}
              userdata={userdata}
            />
          )}
          <div className={`pt-5 pb-3`}>
            {isdesktop && (
              <div
                onClick={report}
                className="p-2 flex justify-end text-gray-400"
              >
                신고하기
              </div>
            )}
            {ismobile && (
              <div
                onClick={report}
                className="p-2 flex justify-end text-gray-400"
              >
                신고하기
              </div>
            )}

            {isdesktop && (
              <div onClick={buy}>
                <LargeButton btn={btn} />
              </div>
            )}
            {ismobile && (
              <div onClick={buy}>
                <ButtonComp width="w-[30rem]" btn={btn} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
