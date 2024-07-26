import { rowfont, center, outborder, nanoBtn } from "../../../lib/styles";
import SellComp from "./contentComps/sellComp";
import CateBtn from "./contentComps/catebutton";
import { useEffect, useState } from "react";
import axios from "axios";
import Review from "./contentComps/Review";

const Content = ({ loginCheck }: { loginCheck: boolean }): JSX.Element => {
  //0 리뷰 , 1 판매 , 2 구매
  const [value, setValue] = useState<number>(0);

  const [isReview, setIsReview] = useState<boolean>(true);

  //func
  const valueChanger = (value: number) => {
    setValue(value);
    if (value === 0) {
      setIsReview(true);
    } else {
      setIsReview(false);
    }
  };

  //comp
  return (
    <div className={`w-[90%] h-[781px] flex flex-wrap pt-5`}>
      <div className={`p-10 w-[100%]`}>
        <div className={`w-[100%] h-[54px] flex flex-wrap`}>
          <div
            className={`cursor-pointer ${
              value === 0 && `scale-110 bg-green-500`
            }`}
          >
            <CateBtn text="리뷰" click={() => valueChanger(0)}></CateBtn>
          </div>

          {loginCheck && (
            <>
              <div
                className={`cursor-pointer ${
                  value === 1 && `scale-110 bg-green-500`
                }`}
              >
                <CateBtn
                  text="판매상품"
                  click={() => valueChanger(1)}
                ></CateBtn>
              </div>

              <div
                className={`cursor-pointer ${
                  value === 2 && `scale-110 bg-green-500`
                }`}
              >
                {" "}
                <CateBtn
                  text="구매상품"
                  click={() => valueChanger(2)}
                ></CateBtn>
              </div>
            </>
          )}
        </div>
        {/* 바뀌는 부분 */}
        {loginCheck && !isReview ? <SellComp value={value}></SellComp> : <></>}
        {isReview ? <Review></Review> : <></>}
        {/*  */}
      </div>
    </div>
  );
};

export default Content;
