import { useRecoilState, useSetRecoilState } from "recoil";
import ButtonComp, { LargeButton } from "../../Component/Button/Button";
import ProductInfo from "../../Component/Product/Product";
import { useBreakPoint } from "../../CustomHook/BreakPoint";
import { Button } from "../../lib/Button/Button";
import { box, center } from "../../lib/styles";
import { Modal, Modalproduct } from "../../Context/Modal";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

interface IProps {}

export interface IData<T> {
  product: T;
}

const Product = ({}: IProps): JSX.Element => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const { isdesktop, ismobile } = useBreakPoint();
  const [cookies, setCookie] = useCookies(["Product"]);
  const [productlog, setproductlog] = useState("");
  const { id } = useParams();
  const btn = new Button("구매하기", "bg-orange-200");
  const ModalState = useSetRecoilState(Modal);
  const Modalproductitem = useSetRecoilState(Modalproduct);

  const [propData, setPropData] = useState<IProductPage>();

  //funcs
  const report = () => {
    ModalState("report");
  };
  const buy = () => {
    ModalState("buy");
  };
  const handleCookie = (product: string) => {
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
  };

  const getDatas = async () => {
    await axios
      .post(`${serverUrl}/product/${id}`, {}, { withCredentials: true })
      .then((data: AxiosResponse<IData<IProductPage>>) => {
        console.log(data);
        const values = data.data.product;
        setPropData(values);
      })
      .catch((err) => {
        console.log(err);
        setPropData(productPageDataErr);
      });
  };

  useEffect(() => {
    if (id !== undefined) {
      setproductlog(id);
      Modalproductitem(id);
    }
    if (cookies.Product == undefined) {
      if (id !== undefined) {
        handleCookie(id);
      }
    } else {
      handleCookie(cookies.Product.product + "+" + id);
    }
  }, []);

  return (
    <div>
      <div className={`${box} ${center} relative`}>
        <div>
          {propData && <ProductInfo data={propData} />}
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
