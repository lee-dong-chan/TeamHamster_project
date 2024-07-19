import { useCallback, useMemo, useState } from "react";
import Imgs from "./Imgs/imgs";
import User, { IUser } from "./User";
import { center } from "../../lib/styles";
import { useBreakPoint } from "../../CustomHook/BreakPoint";
export interface IProduct {}

interface IProps {}

const ProductInfo = ({}: IProps): JSX.Element => {
  const { isdesktop, ismobile } = useBreakPoint();

  const user = {
    id: 1,
    name: "버즐",
    adress: "부산 사하구 1동",
    review: 5,
    img: "hamster",
  };
  const product = {
    title: "방치한 로드팝니다",
    category: "스포츠/레져",
    createdAt: "14시간전",
    price: 35000,
    deliverycost: true,
    content: "지인에게 받았는데 쓰지않아서 판매합니다",
    imgs: ["4", "hamster", "good"],
  };

  const [imgcount, SetCount] = useState(0);

  const setimgpage = useCallback((num: number) => {
    SetCount(num);
  }, []);

  const btns = useMemo(() => {
    const temp = [];
    for (let i = 0; i < product.imgs.length; i++) temp.push(i);
    return temp;
  }, [product.imgs]);

  console.log(imgcount);
  return (
    <div className={`flex flex-col my-[5rem]`}>
      <div className={`${center}`}>
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
