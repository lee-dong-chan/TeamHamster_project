import { ChangeEvent, useCallback, useState } from "react";
import { center } from "../../../lib/styles";
import AdressItem from "./UserAdressItem";
import { Link, useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Modal, Modalproduct } from "../../../Context/Modal";
import ButtonComp from "../../Button/Button";
import { Button } from "../../../lib/Button/Button";

interface IProps {}

const Buy = ({}: IProps): JSX.Element => {
  const btn = new Button("확인", "bg-orange-200");
  const modalstate = useSetRecoilState(Modal);
  const productid = useRecoilState(Modalproduct)[0];
  const [selectcontent, setcontent] = useState<string>();
  const adress = [
    "경기도 남양주시 금곡동 오동아파트310동402호",
    "송파구 장미아파트 302동1302호",
    "올림픽로 323-112",
  ];
  const selectadress = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setcontent(e.target.value);
  }, []);

  const addadress = useCallback(() => {
    modalstate("addadress");
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="p-3 text-center text-[1.3rem] font-bold">구매하기</div>
      <div className="p-4 h-[15rem] w-[40rem] bg-white border border-gray-400 overflow-y-auto scrollbar-hide">
        {adress.map((item: string, idx: number) => (
          <AdressItem key={idx} item={item} selectadress={selectadress} />
        ))}
      </div>
      <div onClick={addadress} className="p-4 text-center text-blue-500">
        +주소추가
      </div>
      <div className="h-[20rem]">
        <div className="w-[40rem]">
          <div className="p-3 text-[1.2rem]">현재주소: {selectcontent}</div>
        </div>
        <div className="p-3 text-[1.3rem]">
          상품금액:<span className="text-orange-400">{productid}</span>원
        </div>
      </div>
      <div>
        <Link to={"/"}>
          <ButtonComp btn={btn} height="h-[4rem]" />
        </Link>
      </div>
    </div>
  );
};

export default Buy;
