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

interface IData {
  userlist: [
    {
      manyreport: [
        {
          id: number;
          nick: string;
        }
      ];
    },
    {
      block: [
        {
          id: number;
          nick: string;
        }
      ];
    }
  ];
}

interface IBen {
  block: [
    {
      id: number;
      nick: string;
    }
  ];
}

interface IProps {}

const ManegeUser = ({}: IProps): JSX.Element => {
  const btn = new Button("검색", "bg-orange-500");
  const [search, setsearch] = useState<string>("");
  const [searchlist, setsearchlist] = useState<IBenUser[]>([]);

  const bensearch = (e: ChangeEvent<HTMLInputElement>) => {
    setsearch(e.target.value);
  };

  const manylist = useQuery({
    queryKey: "manydata",
    queryFn: async () => {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/admin/user`
      );
      const userdatas: IData = data.userlist;
      const userdata = userdatas.userlist;

      const manydata: IReportUser[] = userdata[0].manyreport;
      return manydata;
    },
  });

  console.log(manylist.data);

  const blocklist = useQuery({
    queryKey: "blockdata",
    queryFn: async () => {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/admin/user`
      );
      const userdatas: IData = data.userlist;
      const userdata = userdatas.userlist;

      const blockdata: IBenUser[] = userdata[1].block;
      return blockdata;
    },
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["searchben"],
    mutationFn: async () => {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/admin/userblocksearch`,
        {
          keyword: search,
        },
        { withCredentials: true }
      );
      const Bendatas: IBen = data.block;
      const Bendata: IBenUser[] = Bendatas.block;
      setsearchlist(Bendata);
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: "searchben" });
      queryClient.setQueriesData(["searchben"], data);
    },
  });

  return (
    <div className={`${box} ${center}`}>
      <div>
        <div className=" h-[20rem] w-[70rem] border border-gray-400 overflow-y-auto">
          <ReportUser data={manylist.data} />
        </div>
        <div className="mt-20 h-[20rem] w-[70rem] border border-gray-400 overflow-y-auto">
          <Ben data={searchlist == undefined ? blocklist.data : searchlist} />
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
