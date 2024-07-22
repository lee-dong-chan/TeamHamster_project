import { useRecoilState, useSetRecoilState } from "recoil";
import { Button } from "../../../lib/Button/Button";
import ButtonComp from "../../Button/Button";
import Radioitem from "./RadioItem";
import { Modal, Modalproduct } from "../../../Context/Modal";
import { useBreakPoint } from "../../../CustomHook/BreakPoint";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

interface IProps {}

const Report = ({}: IProps): JSX.Element => {
  const [select, setselect] = useState<string>();
  const selectinput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setselect(e.target.value);
  }, []);

  const { ismobile, isdesktop } = useBreakPoint();
  const setmodal = useSetRecoilState(Modal);
  const productid = useRecoilState(Modalproduct)[0];
  console.log(productid);
  const close = () => {
    setmodal(undefined);
  };
  const btn = new Button("확인", "bg-orange-200");
  const selectreport = [
    "광고성 컨텐츠 입니다",
    "상품정보가 부정확합니다",
    "거래금지 품목입니다.",
    "사기가 의심됩니다(외부거래유도)",
    "전문업자로 의심됩니다",
  ];

  return (
    <div>
      <div className="m-auto w-[40rem] flex flex-col justify-center">
        <div className={`p-4 text-[1.5rem] font-bold text-center`}>
          신고하기
        </div>
        <div className={`text-[1.2rem] h-[35rem] ${ismobile && "px-5"} `}>
          {selectreport.map((item: string, idx: number) => (
            <Radioitem key={idx} item={item} selectinput={selectinput} />
          ))}
          {!select ? (
            <div className={`py-5 ${ismobile && "flex justify-center"} `}>
              <textarea
                className={`p-2 resize-none ${
                  isdesktop && "w-[40rem]"
                } h-[15rem] border bg-white  ${ismobile && "w-[36rem]"}`}
                placeholder="신고사유를 입력해주세요"
              ></textarea>
            </div>
          ) : (
            <div className="my-20 text-[1.3rem] font-bold">
              <div></div>
              <div>
                사유:<span className="text-orange-400">{select}</span>
              </div>
            </div>
          )}
        </div>

        <div onClick={close} className={"flex justify-center"}>
          <ButtonComp btn={btn} height="h-[4rem]" />
        </div>
      </div>
    </div>
  );
};

export default Report;
