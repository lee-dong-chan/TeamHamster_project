import { useCallback, useEffect, useMemo, useState } from "react";
import Imgs from "./Imgs/imgs";
import User from "./User";
import { center } from "../../lib/styles";
import { useBreakPoint } from "../../CustomHook/BreakPoint";
import { IProductPage } from "../../lib/interFace";

interface IProps {
  data: IProductPage;
}

interface IUser {
  id: number;
  name: string;
  adress: string;
  star: number;
  img: string;
}

interface IProduct {
  title: string;
  category: string;
  createdAt: string;
  price: number;
  deliverycost: boolean;
  content: string;
  imgs: string[];
}

const ProductInfo = ({ data }: IProps): JSX.Element => {
  //모바일
  const { isdesktop, ismobile } = useBreakPoint();

  //판매자
  const user: IUser = {
    id: data.Sell.id,
    name: data.Sell.nick,
    adress: "",
    star: +data.Sell.star.star,
    img: "good.png",
  };

  //게시글
  const product: IProduct = {
    title: data.title,
    category: data.Category?.name || "카테고리 에러",
    createdAt:
      (data.createdAt &&
        Math.floor(
          (+new Date() - +new Date(data.createdAt)) / (1000 * 60 * 60 * 24)
        ) + "일전") ||
      "아오 에러시치",
    price: data.price,
    deliverycost: data.DeliveryCost?.cost ? true : false,
    content: data.discription,
    imgs: data.image,
  };

  const [imgcount, SetCount] = useState<number>(0);
  const [btns, setBtns] = useState<number[]>([]);

  const setimgpage = (num: number) => {
    SetCount(num);
  };

  const btnsfunc = () => {
    const temp = [];
    if (product.imgs) {
      for (let i = 0; i < product.imgs.length; i++) temp.push(i);
    }
    setBtns(temp);
  };

  useEffect(() => {
    btnsfunc();
  }, []);

  return (
    <div className={`flex flex-col my-[5rem]`}>
      <div className={`${center}`}>
        {!product?.imgs ? (
          <div
            className={`${isdesktop && "h-[50rem] w-[70rem]"} ${
              ismobile && "h-[25rem] w-[25rem] "
            } overflow-hidden relative`}
          >
            <Imgs item="hamster.png" />
          </div>
        ) : (
          <div
            className={`${isdesktop && "h-[50rem] w-[70rem]"} ${
              ismobile && "h-[25rem] w-[25rem] "
            } overflow-hidden relative`}
          >
            {imgcount == 0 && (
              <div className="flex absolute ">
                {product.imgs.map((item: string, idx: number) => (
                  <Imgs key={idx} item={item} />
                ))}
              </div>
            )}
            {imgcount == 1 && (
              <div
                className={`flex absolute ${
                  isdesktop && "translate-x-[-70rem]"
                } ${ismobile && "translate-x-[-25rem]"}`}
              >
                {product.imgs.map((item: string, idx: number) => (
                  <Imgs key={idx} item={item} />
                ))}
              </div>
            )}
            {imgcount == 2 && (
              <div
                className={`flex absolute ${
                  isdesktop && "translate-x-[-140rem]"
                } ${ismobile && "translate-x-[-50rem]"}`}
              >
                {product.imgs.map((item: string, idx: number) => (
                  <Imgs key={idx} item={item} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <div className={`${center}`}>
        <div className="p-5 flex gap-5">
          {btns.map((_, idx: number) => (
            <div
              key={idx}
              className={`h-4 ${
                idx == imgcount
                  ? "w-7 rounded bg-orange-600"
                  : "w-4 rounded bg-orange-400"
              }`}
              onClick={() => {
                setimgpage(idx);
              }}
            ></div>
          ))}
        </div>
      </div>
      <User user={user} />

      <div className="p-10 flex-1">
        <div className="py-2 text-[1.3rem] font-bold">{product.title}</div>
        <div className="py-2 flex  text-[0.9rem] text-gray-400 gap-3">
          <div>{product.category}</div>
          <div>14시간전</div>
        </div>
        <div className="py-1 flex items-center gap-5">
          <div className="text-[1.2rem] font-bold">{product.price}원</div>
          {product.deliverycost && (
            <div className="p-1 text-[0.7rem] font-bold border">배송비포함</div>
          )}
        </div>
        <div>{product.content}</div>
      </div>
    </div>
  );
};

export default ProductInfo;
