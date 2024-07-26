import { box, center } from "../../lib/styles";
import { SmallButton } from "../../Component/Button/Button";
import { Button } from "../../lib/Button/Button";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

interface IPoint {
  pointPercent: number;
}

interface IData {
  point: IPoint;
}

interface IProps {}

const ManegePoint = ({}: IProps): JSX.Element => {
  const btn = new Button("확인", "bg-orange-500");
  const [onclick, setonclick] = useState<number>(0);
  const [point, setpoint] = useState<number>();
  const changepoint = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setpoint(Number(e.target.value));
  }, []);

  // const submit = async () => {
  //   await axios.patch(
  //     `${process.env.REACT_APP_SERVER_URL}/admin/updatepoint`,
  //     { point: point },
  //     { withCredentials: true }
  //   );
  //   setonclick(onclick + 1);
  //   console.log(onclick);
  //   window.location.replace("/manege/point");
  // };

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["patchpoint"],
    mutationFn: async () => {
      await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/admin/updatepoint`,
        { point: point },
        { withCredentials: true }
      );
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: "pointvalue" });
    },
  });
  const date: IData | undefined = queryClient.getQueryData("pointvalue");
  console.log(date);

  const { data } = useQuery<IData>({
    queryKey: "pointvalue",
    queryFn: async () => {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/pointpercent`,
        {},
        { withCredentials: true }
      );
      return data;
    },
  });

  return (
    <div className={`${box}`}>
      <div className={`${center} flex-col`}>
        <div className="mt-[5rem] mb-[10rem] w-[50rem] flex justify-between items-center">
          <div className="h-[4rem] ">
            <input
              placeholder="1000원당 포인트 액수"
              type="number"
              className="p-3 h-[100%] w-[30rem] border border-gray-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              onInput={changepoint}
            ></input>
          </div>
          <div
            onClick={() => {
              mutate();
            }}
          >
            <SmallButton btn={btn} />
          </div>
        </div>
        <div className="pb-20 flex w-[45rem] text-[2rem] font-bold gap-10">
          <div>현재 포인트 비율: </div>
          <div>
            <span className="text-orange-500">1000</span> 원 당
            <span className="text-orange-500">
              {data?.point.pointPercent ? (
                <span className="p-1">{data?.point.pointPercent}</span>
              ) : (
                "   "
              )}
            </span>
            포인트
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManegePoint;
