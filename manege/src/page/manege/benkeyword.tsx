import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { SmallButton } from "../../Component/Button/Button";

import BenKeyWord from "../../Component/List/ManegeList/BenKeyword/Benkeyword";
import { Button } from "../../lib/Button/Button";

import { box, center } from "../../lib/styles";
import axios, { AxiosResponse } from "axios";

import { useQuery } from "react-query";
import { IKeyword } from "../../Component/List/ManegeList/BenKeyword/BenKeywordItem";

export interface IData {
  Keyword: IKeyword[];
}

interface IProps {}

const ManegeBenKeyword = ({}: IProps): JSX.Element => {
  const btn = new Button("추가", "bg-orange-500");

  const [keyword, setkeyword] = useState<string>("");
  const inputKeyword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setkeyword(e.target.value);
  }, []);

  const submit = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/admin/addkeyword`,
        {
          keyword: keyword,
        },
        { withCredentials: true }
      );
    } catch (err) {
      console.error(err);
    }
  };

  const Keywordlist = useQuery<IData>({
    queryKey: "benlist",
    queryFn: async () => {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/keyword`,
        {},
        { withCredentials: true }
      );
      return data;
    },
  });

  return (
    <div className={`${box} ${center}`}>
      <div>
        <div className=" h-[30rem] w-[70rem] border border-gray-400 overflow-y-auto">
          <BenKeyWord data={Keywordlist.data} />
        </div>
        <div className="mt-[10rem] mb-[10rem]  flex justify-between items-center">
          <div className="h-[4rem] ">
            <input
              placeholder="추가할 금지키워드"
              className="p-3 h-[100%] w-[30rem] border border-gray-400 "
              value={keyword}
              onInput={inputKeyword}
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

export default ManegeBenKeyword;
