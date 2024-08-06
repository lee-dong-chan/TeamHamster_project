import { box, center } from "../../lib/styles";
import { SmallButton } from "../../Component/Button/Button";

import Report from "../../Component/List/ManegeList/Report/Report";
import { Button } from "../../lib/Button/Button";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { IReport } from "../../Component/List/ManegeList/Report/ReportItem";
import { useLocation } from "react-router-dom";

interface IData {
  report: [
    {
      id: number;
      reportText: string;
      Product: {
        id: number;
        Sell: {
          nick: string;
        };
      };
    }
  ];
}
interface IProduct {
  id: number;
  reportText: string;
  Product: {
    id: number;
    Sell: {
      nick: string;
    };
  };
}

const ManegeReport = (): JSX.Element => {
  const [user, setuser] = useState<string>();
  const btn = new Button("검색", "bg-orange-500");
  const queryClient = useQueryClient();
  const searchuser = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setuser(e.target.value);
  }, []);

  const sumit = useMutation({
    mutationKey: "searchreport",
    mutationFn: async () => {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/admin/reportsearch`,
        {
          keyword: user,
        },
        { withCredentials: true }
      );
    },
    onSuccess(data) {
      queryClient.setQueriesData(["searchreport"], data);
    },
  });

  const { data } = useQuery({
    queryKey: "reportlist",
    queryFn: async () => {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/admin/report`,
        {},
        { withCredentials: true }
      );
      const reports: IData = data;
      const report: IProduct[] = reports.report;
      const reportdata = report.map((data: IProduct) => {
        const lastdata: IReport = {
          id: data.id,
          content: data.reportText,
          username: data.Product.Sell.nick,
          productid: data.Product.id,
        };
        return lastdata;
      });
      return reportdata;
    },
  });

  console.log(data);

  // const data: IReport[] = [
  //   { id: 1, content: "광고징", username: "신고함", productid: 3 },
  // ];
  const cate = useLocation().pathname.slice(8);
  useEffect(() => {}, [cate]);
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
          <div
            onClick={() => {
              sumit.mutate();
            }}
          >
            <SmallButton btn={btn} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManegeReport;
