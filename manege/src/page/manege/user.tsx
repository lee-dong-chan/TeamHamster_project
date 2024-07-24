import { box, center } from "../../lib/styles";
import { SmallButton } from "../../Component/Button/Button";

import Ben from "../../Component/List/ManegeList/User/Ben/Ben";
import ReportUser from "../../Component/List/ManegeList/User/ReportUser/ReportUser";
import { Button } from "../../lib/Button/Button";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { IReportUser } from "../../Component/List/ManegeList/User/ReportUser/UserItem";
import { IBenUser } from "../../Component/List/ManegeList/User/Ben/BenItem";
import { ChangeEvent, useCallback, useState } from "react";
interface Block {
  id: number;
  nick: string;
}

interface UserList {
  manyreport: Block[];
  block: Block[];
}

interface IProps {}

const ManegeUser = ({}: IProps): JSX.Element => {
  const btn = new Button("검색", "bg-orange-500");
  const [search, setsearch] = useState<string>("");
  const [searchlist, setsearchlist] = useState();

  const bensearch = (e: ChangeEvent<HTMLInputElement>) => {
    setsearch(e.target.value);
  };

  const user = useQuery<UserList>({
    queryKey: "User",
    queryFn: async () => {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/admin/user`
      );
      return data;
    },
  });

  const Manyreport = user.data?.manyreport;
  const block = user.data?.block;

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["searchben"],
    mutationFn: async () => {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/admin/userblocksearch`,
        {
          keyword: search,
        },
        { withCredentials: true }
      );
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: "searchben" });
      queryClient.setQueriesData(["searchben"], data);
    },
  });

  const searchuser: Block[] | undefined = queryClient.getQueryData([
    "searchben",
  ]);

  return (
    <div className={`${box} ${center}`}>
      <div>
        <div className=" h-[20rem] w-[70rem] border border-gray-400 overflow-y-auto">
          <ReportUser data={Manyreport} />
        </div>
        <div className="mt-20 h-[20rem] w-[70rem] border border-gray-400 overflow-y-auto">
          <Ben data={searchuser == undefined ? block : searchuser} />
        </div>
        <div className="mt-[10rem] mb-[10rem]  flex justify-between items-center">
          <div className="h-[4rem] ">
            <input
              placeholder="정지유저 검색"
              className="p-3 h-[100%] w-[30rem] border border-gray-400 "
              value={search}
              onInput={bensearch}
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
      </div>
    </div>
  );
};

export default ManegeUser;
