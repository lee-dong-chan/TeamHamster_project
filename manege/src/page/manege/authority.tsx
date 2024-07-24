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

const Authority = ({}: IProps): JSX.Element => {
  const btn = new Button("확인", "bg-orange-500");
  const [user, setuser] = useState<string>();
  const searchuser = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setuser(e.target.value);
  }, []);

  const queryClient = useQueryClient();
  // const { mutate } = useMutation({
  //   mutationKey: ["authorityuser"],
  //   mutationFn: async () => {
  //     await axios.patch(
  //       `${process.env.REACT_APP_SERVER_URL}/admin/updatepoint`,
  //       { point: point },
  //       { withCredentials: true }
  //     );
  //   },
  //   onSuccess(data) {
  //     queryClient.invalidateQueries({ queryKey: "pointvalue" });
  //   },
  // });
  const userdata: IData | undefined = queryClient.getQueryData("pointvalue");

  return (
    <div className={`${box}`}>
      <div className={`${center} flex-col`}>
        <div className="mt-[5rem] mb-3 w-[50rem] flex justify-between items-center">
          <div className="h-[4rem] ">
            <input
              placeholder="유저검색"
              className="p-3 h-[100%] w-[30rem] border border-gray-400"
              onInput={searchuser}
            ></input>
          </div>
        </div>
        <div className="pb-20 flex w-[45rem] text-[2rem] font-bold gap-10">
          <div>
            유저
            <span className="text-orange-500">??</span>
            에게 관리자 권한을 부여하시겠습니까?
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authority;
