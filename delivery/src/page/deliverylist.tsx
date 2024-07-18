import { Link } from "react-router-dom";
import ButtonComp from "../Component/Button/Button";
import { Button } from "../lib/Button/Button";
import { mobilebox } from "../lib/styles";
import { List } from "../Component/List/List";
import { ChangeEvent, useEffect, useState } from "react";
import { delivery } from "../Component/List/item/Item";
interface IProps {
  liststate: number;
  checklist(item: number): void;
}
const DeliveryList = ({ liststate, checklist }: IProps): JSX.Element => {
  const [checkbox, SetCheckBox] = useState("");
  const checkdata = (e: ChangeEvent<HTMLInputElement>) => {
    SetCheckBox(e.target.value);
  };
  const [isMounted, SetIsMounted] = useState(false);
  const [pickitems, SetPickItems] = useState<string[]>([]);
  const test3: delivery[] = [
    { id: 1, deliveryadress: "어디지", state: "배송중" },
    { id: 2, deliveryadress: "어디지", state: "배송대기" },
  ];

  const data = () => {
    let str = pickitems[0];
    for (let i = 0; i < pickitems.length - 1; i++) {
      str += "," + pickitems[i + 1];
    }

    return str;
  };

  useEffect(() => {
    checklist(3);
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
      <div className="py-3 text-[1.2rem] font-bold">배송목록</div>
      <div className={`my-5 `}>
        <List liststate={liststate} list3={test3} checkdata={checkdata} />
      </div>
      <div className={`my-5 flex`}>
        <div className="flex items-center">
          <div className="pe-2 text-[1.2rem] font-bold">배송번호:{data()} </div>
          번
        </div>
      </div>

      <div className="m-3 text-[1.3rem] font-bold">
        배송을 시작 하시겠습니까?
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

export default DeliveryList;
