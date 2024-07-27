import { Link } from "react-router-dom";
import ButtonComp, { LargeButton } from "../Component/Button/Button";
import { Button } from "../lib/Button/Button";
import { center, mobilebox } from "../lib/styles";

import Scan from "../Component/Scan/Scan";
import { ChangeEvent, useState } from "react";
import { Debounce } from "../Costomhook/Debounce";
import { useMutation } from "react-query";
import axios from "axios";
const DeliveryScan = (): JSX.Element => {
  const [pickitem, SetPickItem] = useState<string>("");
  const changeitem = (e: ChangeEvent<HTMLInputElement>) => {
    SetPickItem(e.target.value);
  };
  const item = Debounce(pickitem, 200);

  const completdelivery = useMutation({
    mutationKey: ["pickcomplete"],
    mutationFn: async () => {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/delivery/deliverycomplete/${item}`,
        {},
        { withCredentials: true }
      );
    },
  });

  const btn = new Button("확인", "bg-blue-200");
  return (
    <div
      className={`${mobilebox} flex flex-col items-center h-[41rem] overflow-auto`}
    >
      <div className="py-3 text-[1.2rem] font-bold">배송완료 스캔</div>
      <div className={`my-5 `}>
        <Scan />
      </div>
      <div className={`my-5 flex`}>
        <div className="flex items-center">
          <div className="pe-2 text-[1.2rem] font-bold">배송번호: </div>
          <input
            className="p-1 h-[2.5rem] w-[20rem] border"
            placeholder="배송번호를 입력하세요"
            onChange={changeitem}
          ></input>
        </div>
      </div>

      <div className="m-5 text-[1.3rem] font-bold">
        <span className="text-orange-400">{pickitem}</span>상품배송을 완료
        하시겠습니까?
      </div>
      <div className={`m-[3rem] `}>
        <Link to={"/"}>
          <div
            onClick={() => {
              completdelivery.mutate();
            }}
          >
            <ButtonComp btn={btn} width={"w-[25rem]"} height="h-[4rem]" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DeliveryScan;
