import { ChangeEvent, useCallback, useState } from "react";
import { SmallButton } from "../../Component/Button/Button";

import BenKeyWord from "../../Component/List/ManegeList/BenKeyword/Benkeyword";
import { Button } from "../../lib/Button/Button";

import { box, center } from "../../lib/styles";
import axios from "axios";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { IKeyword } from "../../Component/List/ManegeList/BenKeyword/BenKeywordItem";
import { useSetRecoilState } from "recoil";
import { Modalcontent, Modalstate } from "../../Context/Modal/Modal";

export interface IData {
  Keyword: IKeyword[];
}

const ManegeBenKeyword = (): JSX.Element => {
  const setmodalvalue = useSetRecoilState(Modalcontent);
  const setmodlastate = useSetRecoilState(Modalstate);
  const btn = new Button("추가", "bg-orange-500");

  const [keyword, setkeyword] = useState<string>("");
  const inputKeyword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setkeyword(e.target.value);
  }, []);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["addKeyword"],
    mutationFn: async () => {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/admin/addkeyword`,
        {
          keyword: keyword,
        },
        { withCredentials: true }
      );
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: "benlist" });
      setmodalvalue("benkeyword");
    },
  });

  useQuery({
    queryKey: ["benlist"],
    queryFn: async () => {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/admin/keyword`,
        {},
        { withCredentials: true }
      );
      const keywordlist = data.keyword;

      return keywordlist;
    },
  });

  const Data: IKeyword[] | undefined = queryClient.getQueryData(["benlist"]);
  console.log(Data);

  return (
    <div className={`${box} ${center}`}>
      <div>
        <div className=" h-[30rem] w-[70rem] border border-gray-400 overflow-y-auto">
          {Data ? <BenKeyWord data={Data} /> : ""}
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
          <div
            onClick={() => {
              mutate();
              setmodlastate(true);
            }}
          >
            <SmallButton btn={btn} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManegeBenKeyword;
