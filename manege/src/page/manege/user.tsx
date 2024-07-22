import { box, center } from "../../lib/styles";
import { SmallButton } from "../../Component/Button/Button";

import Ben from "../../Component/List/ManegeList/User/Ben/Ben";
import ReportUser from "../../Component/List/ManegeList/User/ReportUser/ReportUser";
import { Button } from "../../lib/Button/Button";
import { useQuery } from "react-query";
import axios from "axios";
import { IReportUser } from "../../Component/List/ManegeList/User/ReportUser/UserItem";
import { IBenUser } from "../../Component/List/ManegeList/User/Ben/BenItem";
import { ChangeEvent, useCallback, useState } from "react";

interface IProps {}

const ManegeUser = ({}: IProps): JSX.Element => {
  const btn = new Button("검색", "bg-orange-500");
  const [search, setsearch] = useState<string>("");
  const bensearch = (e: ChangeEvent<HTMLInputElement>) => {
    setsearch(e.target.value);
  };
  // const user = useQuery({
  //   queryKey: "User",
  //   queryFn: async () => {
  //     const { data } = await axios.post("http://localhost/admin/user");
  //     console.log(data);
  //   },
  // });
  const user = {
    userlist: [{ id: 1, name: "악질" }],
    block: [{ id: 1, name: "악질놈" }],
  };

  const submit = useCallback(async () => {
    try {
      await axios.post(
        "http://localhost:8000/admin/benusersearch",
        {
          keyword: search,
        },
        { withCredentials: true }
      );
    } catch (err) {
      console.error(err);
    }
  }, []);
  return (
    <div className={`${box} ${center}`}>
      <div>
        <div className=" h-[20rem] w-[70rem] border border-gray-400 overflow-y-auto">
          <ReportUser data={user.userlist} />
        </div>
        <div className="mt-20 h-[20rem] w-[70rem] border border-gray-400 overflow-y-auto">
          <Ben data={user.block} />
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
          <div onClick={submit}>
            <SmallButton btn={btn} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManegeUser;
