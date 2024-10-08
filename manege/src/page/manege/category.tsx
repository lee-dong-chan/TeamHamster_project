import { box, center } from "../../lib/styles";

import ManegeCategoryList from "../../Component/Category/ManegeCategory/ManegeCategory";

import { ChangeEvent, useCallback, useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useSetRecoilState } from "recoil";
import { Modalcontent, Modalstate } from "../../Context/Modal/Modal";
import { LargeButton } from "../../Component/Button/ButtonClass";
import Button from "../../lib/Button/Button";

const ManegeCategory = (): JSX.Element => {
  const setmodalvalue = useSetRecoilState(Modalcontent);
  const setmodlastate = useSetRecoilState(Modalstate);
  const [topname, settopname] = useState<string>();
  const [topcate, settopcate] = useState<number | undefined>();
  const [createcate, setcreatecate] = useState<string>();
  const btn = new Button("카테고리 생성", "bg-orange-500");
  const ok = () => {
    console.log("");
  };
  const create = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setcreatecate(e.target.value);
  }, []);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["addcate"],
    mutationFn: async () => {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/admin/createcategory`,
        {
          precate: topcate,
          name: createcate,
        },
        { withCredentials: true }
      );
    },
    onSuccess(data) {
      queryClient.invalidateQueries("firstcate");
      queryClient.invalidateQueries("manegesecondcate");
      setmodalvalue("addcate");
    },
  });

  return (
    <div className={`${box} pb-10`}>
      <div className={`${center}`}>
        <ManegeCategoryList settopcate={settopcate} settopname={settopname} />
      </div>
      <div className={`${center}`}>
        <div className="mt-[10rem] mb-[10rem] w-[60rem]  flex justify-between items-center">
          <div className="h-[4rem] ">
            <input
              type="text"
              value={topcate !== undefined ? `${topcate}:${topname}` : ""}
              placeholder="상위카테고리"
              className="p-3 h-[100%] w-[25rem] border border-gray-400 "
              onChange={ok}
            ></input>
          </div>
          <div className="h-[4rem] ">
            <input
              placeholder="생성할 카테고리"
              className="p-3 h-[100%] w-[25rem] border border-gray-400 "
              onChange={create}
            ></input>
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          mutate();
          setmodlastate(true);
        }}
        className={`${center}`}
      >
        <LargeButton btn={btn} />
      </div>
    </div>
  );
};

export default ManegeCategory;
