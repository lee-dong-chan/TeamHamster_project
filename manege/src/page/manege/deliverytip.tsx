import { box, center } from "../../lib/styles";
import { SmallButton } from "../../Component/Button/Button";
import { Button } from "../../lib/Button/Button";
import { ChangeEvent, useCallback, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";

interface IProps {}

const ManegeDeliveryTip = ({}: IProps): JSX.Element => {
  const [tip, settip] = useState<number>(0);
  const changetip = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    settip(Number(e.target.value));
  }, []);

  const submit = async () => {
    await axios.patch(
      ` ${process.env.REACT_APP_SERVER_URL}/admin/updatedeliverycost`,
      { cost: tip },
      { withCredentials: true }
    );
  };

  const deliverycost = useQuery({
    queryKey: "deliverycost",
    queryFn: async () => {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/admin/deliverycost`
      );
      return data;
    },
  });
  console.log(deliverycost.data?.cost.cost);
  const btn = new Button("확인", "bg-orange-500");

  return (
    <div className={`${box}`}>
      <div className={`${center} flex-col`}>
        <div className="mt-[5rem] mb-[10rem] w-[50rem] flex justify-between items-center">
          <div className="h-[4rem] ">
            <input
              placeholder="배송비 액수"
              className="p-3 h-[100%] w-[30rem] border border-gray-400 "
              value={tip}
              onInput={changetip}
            ></input>
          </div>
          <div onClick={submit}>
            <SmallButton btn={btn} />
          </div>
        </div>
        <div className="pb-20 flex w-[45rem] text-[2rem] font-bold gap-10">
          <div>현재 배송비: </div>
          <div>
            <span className="text-orange-500">
              {deliverycost.data?.cost.cost}
            </span>
            원
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManegeDeliveryTip;
