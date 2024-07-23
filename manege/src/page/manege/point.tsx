import { box, center } from "../../lib/styles";
import { SmallButton } from "../../Component/Button/Button";
import { Button } from "../../lib/Button/Button";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";

interface IPoint {
  pointPercent: number;
}

interface IData {
  point: IPoint;
}

interface IProps {}

const ManegePoint = ({}: IProps): JSX.Element => {
  const btn = new Button("확인", "bg-orange-500");
  const [point, setpoint] = useState<number>(0);
  const changepoint = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setpoint(Number(e.target.value));
  }, []);

  const submit = useCallback(async () => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/admin/updatepoint`,
        { point: point },
        { withCredentials: true }
      );
    } catch (err) {
      console.error(err);
    }
  }, []);

  const pointpercent = useQuery<IData>({
    queryKey: "pointvalue",
    queryFn: async () => {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/admin/pointpercent`
      );
      console.log(data);
      return data;
    },
  });

  useEffect(() => {
    console.log(pointpercent.data?.point);
  }, [pointpercent]);

  const data = { point: 1000 };
  return (
    <div className={`${box}`}>
      <div className={`${center} flex-col`}>
        <div className="mt-[5rem] mb-[10rem] w-[50rem] flex justify-between items-center">
          <div className="h-[4rem] ">
            <input
              placeholder="1000원당 포인트 액수"
              className="p-3 h-[100%] w-[30rem] border border-gray-400 "
              value={point}
              onInput={changepoint}
            ></input>
          </div>
          <div onClick={submit}>
            <SmallButton btn={btn} />
          </div>
        </div>
        <div className="pb-20 flex w-[45rem] text-[2rem] font-bold gap-10">
          <div>현재 포인트 비율: </div>
          <div>
            <span className="text-orange-500">1000</span> 원 당
            {/* <span className="text-orange-500">{pointpercent.data?.point}</span> */}
            포인트
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManegePoint;
