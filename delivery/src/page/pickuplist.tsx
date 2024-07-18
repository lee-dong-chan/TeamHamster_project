import { Link } from "react-router-dom";
import ButtonComp, { LargeButton } from "../Component/Button/Button";
import { Button } from "../lib/Button/Button";
import { center, mobilebox } from "../lib/styles";

import { List } from "../Component/List/List";
import { useEffect } from "react";
import { Picklist } from "../Component/List/item/Item";
interface IProps {
  liststate: number;
  checklist(item: number): void;
}
const PickUpList = ({ liststate, checklist }: IProps): JSX.Element => {
  const test2: Picklist[] = [
    { id: 1, pickadress: "어딘가", state: "픽업대기" },
    { id: 2, pickadress: "무언가", state: "픽업완료" },
  ];
  useEffect(() => {
    checklist(2);
  }, []);
  const btn = new Button("확인", "bg-blue-200");
  return (
    <div className={`${mobilebox} flex flex-col items-center`}>
      <div className="py-3 text-[1.2rem] font-bold">픽업 목록</div>
      <div className={`mt-5 my-[6rem]`}>
        <List liststate={liststate} list2={test2} />
      </div>

      <div className={`m-[3rem]`}>
        <Link to={"/"}>
          <div>
            <ButtonComp btn={btn} width={"w-[25rem]"} height="h-[4rem]" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PickUpList;
