import { Link } from "react-router-dom";
import ButtonComp from "../Component/Button/Button";
import { Button } from "../lib/Button/Button";
import { mobilebox } from "../lib/styles";

import { List } from "../Component/List/List";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { PickCheck } from "../Component/List/item/Item";
interface IProps {
  liststate: number;
  checklist(item: number): void;
}

const PickupCheck = ({ liststate, checklist }: IProps): JSX.Element => {
  const [checkbox, SetCheckBox] = useState("");
  const checkdata = (e: ChangeEvent<HTMLInputElement>) => {
    SetCheckBox(e.target.value);
  };
  const [isMounted, SetIsMounted] = useState(false);
  const [pickitems, SetPickItems] = useState<string[]>([]);
  const test1: PickCheck[] = [
    { id: 1, pickadress: "어디지", campadress: "배송중" },
    { id: 2, pickadress: "어디지", campadress: "배송중" },
  ];

  const data = () => {
    let str = pickitems[0];
    for (let i = 0; i < pickitems.length - 1; i++) {
      str += "," + pickitems[i + 1];
    }

    return str;
  };

  useEffect(() => {
    checklist(1);
  }, []);
  useEffect(() => {
    if (isMounted) {
      SetPickItems(
        [...pickitems, checkbox].filter(
          (item, idx) => [...pickitems, checkbox].indexOf(item) === idx
        )
      );
    } else {
      SetIsMounted(true);
    }
  }, [checkbox]);

  const btn = new Button("확인", "bg-blue-200");
  return (
    <div className={`${mobilebox} flex flex-col items-center`}>
      <div className="py-3 text-[1.2rem] font-bold">픽업건 선택</div>
      <div className={`my-5 `}>
        <List liststate={liststate} list1={test1} checkdata={checkdata} />
      </div>
      <div className={`my-5 flex`}>
        <div className="flex items-center">
          <div className="pe-2 text-[1.2rem] font-bold">배송번호:{data()}</div>
          번
        </div>
      </div>

      <div className="m-10 text-[1.3rem] font-bold">
        픽업건을 선택 하시겠습니까?
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

export default PickupCheck;
