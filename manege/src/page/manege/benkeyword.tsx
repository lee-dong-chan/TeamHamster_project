import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { SmallButton } from "../../Component/Button/Button";

import BenKeyWord from "../../Component/List/ManegeList/BenKeyword/Benkeyword";
import { Button } from "../../lib/Button/Button";

import { box, center } from "../../lib/styles";
import axios, { AxiosResponse } from "axios";

import { useQuery } from "react-query";
import { IKeyword } from "../../Component/List/ManegeList/BenKeyword/BenKeywordItem";

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
        "http://localhost:8000/admin/addkeyword",
        {
          keyword: keyword,
        },
        { withCredentials: true }
      );
    } catch (err) {
      console.error(err);
    }
  };

  // const { data } = useQuery<IList[]>({
  //   queryKey: "benlist",
  //   queryFn: async () => {
  //     const { data } = await axios.post("http://localhost/admin/keyword");
  //     console.log(data);
  //     return data;
  //   },
  // });

  const data: IKeyword[] = [{ id: 1, benkeyword: "삭제" }];

  return (
    <div className={`${box} ${center}`}>
      <div>
        <div className=" h-[30rem] w-[70rem] border border-gray-400 overflow-y-auto">
          <BenKeyWord data={data} />
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
