import { box, center } from "../../lib/styles";
import { LargeButton } from "../../Component/Button/Button";

import ManegeCategoryList from "../../Component/Category/ManegeCategory/ManegeCategory";
import { Button } from "../../lib/Button/Button";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import axios from "axios";

interface IProps {}

const ManegeCategory = ({}: IProps): JSX.Element => {
  const [topcate, settopcate] = useState<number | undefined>();
  const [createcate, setcreatecate] = useState<string>();
  const btn = new Button("카테고리 생성", "bg-orange-500");
  const ok = () => {
    console.log("");
  };
  const create = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setcreatecate(e.target.value);
  }, []);

  const sumit = useCallback(async () => {
    try {
      await axios.post("http://localhost/admin/createcategory", {
        precate: topcate,
        name: createcate,
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {}, []);
  return (
    <div className={`$${box} pb-10`}>
      <div className={`${center}`}>
        <ManegeCategoryList settopcate={settopcate} />
      </div>
      <div className={`${center}`}>
        <div className="mt-[10rem] mb-[10rem] w-[60rem]  flex justify-between items-center">
          <div className="h-[4rem] ">
            <input
              type="text"
              value={topcate !== undefined ? `id:${topcate}` : ""}
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
      <div onClick={sumit} className={`${center}`}>
        <LargeButton btn={btn} />
      </div>
    </div>
  );
};

export default ManegeCategory;
