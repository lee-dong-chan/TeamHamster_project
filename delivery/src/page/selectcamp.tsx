import { Link } from "react-router-dom";
import ButtonComp, { LargeButton } from "../Component/Button/Button";
import { Button } from "../lib/Button/Button";
import { center, mobilebox } from "../lib/styles";
import Camp from "../Component/Camp/Camp";
import { useState } from "react";

const SelectCamp = (): JSX.Element => {
  const camplist: string[] = ["천호", "송파", "구의"];
  const [select, SetSelect] = useState<string>();
  const changeselect = (item: string) => {
    SetSelect(item);
  };
  const btn = new Button("확인", "bg-blue-200");
  return (
    <div className={`${mobilebox} h-[43rem] flex flex-col items-center`}>
      <div className="py-3 text-[1.2rem] font-bold">배송캠프 선택</div>
      <div className={`my-5 `}>
        <Camp camplist={camplist} changeselect={changeselect} />
      </div>

      <div className="m-7 text-[1.3rem] font-bold">
        <span className="text-orange-500">{select}</span> 캠프 선택하시겠습니까?
      </div>
      <div className={`m-[3rem] `}>
        <Link to={"/"}>
          <div>
            <ButtonComp btn={btn} width={"w-[25rem]"} height="h-[4rem]" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SelectCamp;
