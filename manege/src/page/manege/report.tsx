import { box, center } from "../../lib/styles";
import { SmallButton } from "../../Component/Button/Button";

import Report from "../../Component/List/ManegeList/Report/Report";
import { Button } from "../../lib/Button/Button";
import { ChangeEvent, useCallback, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { IReport } from "../../Component/List/ManegeList/Report/ReportItem";

interface IProps {}

const ManegeReport = ({}: IProps): JSX.Element => {
  const [user, setuser] = useState<string>();
  const btn = new Button("검색", "bg-orange-500");

  const searchuser = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setuser(e.target.value);
  }, []);

  const sumit = useCallback(async () => {
    try {
      await axios.post("http://localhost:3000", {
        keyword: user,
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  // const { data } = useQuery<IReport[]>({
  //   queryKey: "reportlist",
  //   queryFn: async () => {
  //     const { data } = await axios.post("http://localhost:3000");
  //     console.log(data);
  //     return data;
  //   },
  // });

  const data: IReport[] = [
    { id: 1, content: "광고징", username: "신고함", productid: 3 },
  ];

  return (
    <div className={`${box} ${center}`}>
      <div>
        <div className=" h-[30rem] w-[70rem] border border-gray-400 overflow-y-scroll">
          <Report data={data} />
        </div>
        <div className="mt-[10rem] mb-[10rem]  flex justify-between items-center">
          <div className="h-[4rem] ">
            <input
              placeholder="피신고유저 검색"
              className="p-3 h-[100%] w-[30rem] border border-gray-400 "
              value={user !== undefined ? user : ""}
              onInput={searchuser}
            ></input>
          </div>
          <div onClick={sumit}>
            <SmallButton btn={btn} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManegeReport;
