import { box, center } from "../../lib/styles";
import { SmallButton } from "../../Component/Button/Button";

import Ben from "../../Component/List/ManegeList/User/Ben/Ben";
import ReportUser from "../../Component/List/ManegeList/User/ReportUser/ReportUser";
import { Button } from "../../lib/Button/Button";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { IReportUser } from "../../Component/List/ManegeList/User/ReportUser/UserItem";
import { IBenUser } from "../../Component/List/ManegeList/User/Ben/BenItem";
import { ChangeEvent, useState } from "react";

const ManegeUser = (): JSX.Element => {
  const btn = new Button("검색", "bg-orange-500");
  const [search, setsearch] = useState<string>("");

  const bensearch = (e: ChangeEvent<HTMLInputElement>) => {
    setsearch(e.target.value);
  };

  const manylist = useQuery({
    queryKey: "manydata",
    queryFn: async () => {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/admin/manyreportuser`,
        {},
        { withCredentials: true }
      );
      const manylist: IReportUser[] = data.manyreport;
      return manylist;
    },
  });

  const blocklist = useQuery({
    queryKey: "blockdata",
    queryFn: async () => {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/admin/blockuser`,
        {},
        { withCredentials: true }
      );
      const blocklist: IBenUser[] = data.block;
      return blocklist;
    },
  });

  useQueryClient();

  const searchlist = useMutation({
    mutationKey: ["searchben"],
    mutationFn: async () => {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/admin/userblocksearch`,
        {
          nick: search,
        },
        { withCredentials: true }
      );
      const Bendatas: IBenUser[] = data.block;
      return Bendatas;
    },
  });

  console.log(searchlist.data);

  return (
    <div className={`${box} ${center}`}>
      <div>
        <div className=" h-[20rem] w-[70rem] border border-gray-400 overflow-y-auto">
          <ReportUser data={manylist.data} />
        </div>
        <div className="mt-20 h-[20rem] w-[70rem] border border-gray-400 overflow-y-auto">
          <Ben data={searchlist.data ? searchlist.data : blocklist.data} />
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
              searchlist.mutate();
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
