import { rowfont, center, outborder, nanoBtn } from "../../../lib/styles";
import SellComp from "./contentComps/sellComp";
import CateBtn from "./contentComps/catebutton";
import { useEffect, useState } from "react";
import axios from "axios";
import Review from "./contentComps/Review";
import { useBreakPoint } from "../../../CustomHook/BreakPoint";

interface IProps {
  loginCheck: boolean;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  isReview: boolean;
  valueChanger: (value: number) => void;
}

const Content = ({
  loginCheck,
  value,
  isReview,
  valueChanger,
}: IProps): JSX.Element => {
  const { isdesktop, ismobile } = useBreakPoint();
  //0 리뷰 , 1 판매 , 2 구매

  //func

  //comp
  return (
    <div
      className={`w-[97%] min-w-[35rem] h-[781px] mt-10 mb-10 flex flex-wrap pt-5 border `}
    >
      <div className={`p-10 w-[100%]`}>
        <div className={`w-[100%] h-[54px] flex flex-wrap`}>
          <div
            className={` cursor-pointer  ${
              isdesktop && value === 0 && `scale-110 `
            } ${ismobile && value === 0 && `scale-110 text-orange-300`}`}
          >
            <CateBtn text="리뷰" click={() => valueChanger(0)}></CateBtn>
          </div>

          {loginCheck && (
            <>
              <div
                className={`cursor-pointer ${
                  isdesktop && value === 1 && `scale-110 `
                } ${ismobile && value === 1 && `scale-110 text-orange-300`}`}
              >
                <CateBtn
                  text="판매상품"
                  click={() => valueChanger(1)}
                ></CateBtn>
              </div>

              <div
                className={`cursor-pointer  ${
                  isdesktop && value === 2 && `scale-110 `
                } ${ismobile && value === 2 && `scale-110 text-orange-300`}`}
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
