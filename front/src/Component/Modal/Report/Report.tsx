import { useRecoilState, useSetRecoilState } from "recoil";
import { Button } from "../../../lib/Button/Button";
import ButtonComp from "../../Button/Button";
import Radioitem from "./RadioItem";
import { Modal, Modalproduct } from "../../../Context/Modal";
import { useBreakPoint } from "../../../CustomHook/BreakPoint";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import axios from "axios";

interface IProps {}

const Report = ({}: IProps): JSX.Element => {
  const [select, setselect] = useState<string>();
  const [check, setCheck] = useState<boolean>(false);

  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const selectinput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setselect(e.target.value);
    setCheck(true);
  }, []);

  const { ismobile, isdesktop } = useBreakPoint();
  const setmodal = useSetRecoilState(Modal);
  const productid = useRecoilState(Modalproduct)[0];

  //funcs
  const close = () => {
    setselect(undefined);
    setmodal(undefined);
    setCheck(false);
  };

  const doReport = async (text: string) => {
    await axios
      .post(
        `${serverUrl}/report/${productid}`,
        {
          reporttext: text,
        },
        { withCredentials: true }
      )
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
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
          {!check ? (
            <div className={`py-5 ${ismobile && "flex justify-center"} `}>
              <textarea
                onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
                  setselect(e.currentTarget.value);
                }}
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

        <div
          onClick={() => {
            console.log(productid, select);

            if (select) {
              doReport(select);
              close();
            }
          }}
          className={"flex justify-center"}
        >
          <ButtonComp btn={btn} height="h-[4rem]" />
        </div>
      </div>
    </div>
  );
};

export default Report;
