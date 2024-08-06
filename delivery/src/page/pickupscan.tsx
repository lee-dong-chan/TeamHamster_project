import { Link } from "react-router-dom";
import ButtonComp from "../Component/Button/Button";
import { Button } from "../lib/Button/Button";
import { mobilebox } from "../lib/styles";
import Scan from "../Component/Scan/Scan";
import { ChangeEvent, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { Debounce } from "../Costomhook/Debounce";
import { useSetRecoilState } from "recoil";
import { Modalcontent, Modalstate } from "../Context/Modal/Modal";

const PickupScan = (): JSX.Element => {
  const setsystemonoff = useSetRecoilState(Modalstate);
  const setModalcontent = useSetRecoilState(Modalcontent);
  const [pickitem, SetPickItem] = useState<string>("");
  const changeitem = (e: ChangeEvent<HTMLInputElement>) => {
    SetPickItem(e.target.value);
  };
  useQueryClient();

  const item = Debounce(pickitem, 200);

  const btn = new Button("확인", "bg-blue-200");
  const queryClient = useQueryClient();
  const completepcik = useMutation({
    mutationKey: ["pickcomplete"],
    mutationFn: async () => {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/delivery/pickscan/${item}`,
        {},
        { withCredentials: true }
      );
    },
    onSuccess(data) {
      queryClient.invalidateQueries(["mypickup"]);
      setModalcontent("completepick");
      setsystemonoff(true);
    },
    onError() {
      setModalcontent("failpickscan");
      setsystemonoff(true);
    },
  });

  return (
    <div className={`${mobilebox} flex flex-col items-center`}>
      <div className="py-3 text-[1.2rem] font-bold">픽업상품 스캔</div>
      <div className={`my-5 `}>
        <Scan />
      </div>
      <div className={`my-5 flex`}>
        <div className="flex items-center">
          <div className="pe-2 text-[1.2rem] font-bold">배송번호: </div>
          <input
            type="number"
            className="p-1 h-[2.5rem] w-[20rem] border [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            placeholder="배송번호를 입력하세요"
            onChange={changeitem}
          ></input>
        </div>
      </div>

      <div className="m-4 text-[1.3rem] font-bold">
        <span className="text-orange-400">{pickitem}</span>상품을 픽업
        하시겠습니까?
      </div>
      <div className={`m-[3rem] `}>
        <Link to={"/"}>
          <div
            onClick={() => {
              completepcik.mutate();
            }}
          >
            <ButtonComp btn={btn} width={"w-[25rem]"} height="h-[4rem]" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PickupScan;
