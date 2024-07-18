import { ChangeEvent, useState } from "react";
import { Button } from "../../../lib/Button/Button";
import ButtonComp, { TinyButton } from "../../Button/Button";
import { Link } from "react-router-dom";

export interface PickCheck {
  id: number;
  pickadress: string;
  campadress: string;
}

export interface Picklist {
  id: number;
  pickadress: string;
  state: string;
}

export interface delivery {
  id: number;
  deliveryadress: string;
  state: string;
}

interface IProps {
  liststate: number;
  item1?: PickCheck;
  item2?: Picklist;
  item3?: delivery;
  checkdata?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Item = ({
  liststate,
  item1,
  item2,
  item3,
  checkdata,
}: IProps): JSX.Element => {
  const btn = new Button("완료", "bg-blue-300");
  const [checked, setchecked] = useState(false);
  const changecheck = () => {
    setchecked(true);
  };
  return (
    <div>
      {liststate == 1 && (
        <div className="px-4 py-2  flex">
          <div className="pe-2">{item1?.id}</div>
          <div className="flex-1 text-center truncate">{item1?.pickadress}</div>
          <div className="flex-1 text-center truncate">{item1?.campadress}</div>
          <input
            type="checkbox"
            onClick={changecheck}
            checked={checked}
            value={item1?.id}
            onChange={checkdata}
          ></input>
        </div>
      )}
      {liststate == 2 && (
        <div className="px-4 py-2 flex">
          <div>{item2?.id}</div>
          <div className="flex-1 text-center">{item2?.pickadress}</div>
          <div>{item2?.state}</div>
        </div>
      )}
      {liststate == 3 && (
        <div className="px-4 py-2 flex items-center">
          <div>{item3?.id}</div>
          <div className="flex-1 text-center">{item3?.deliveryadress}</div>
          <div className="pe-3">{item3?.state}</div>
          {item3?.state !== "배송중" ? (
            <input
              className="ms-3"
              type="checkbox"
              onClick={changecheck}
              checked={checked}
              value={item3?.id}
              onChange={checkdata}
            ></input>
          ) : (
            <div className="w-[2rem]"></div>
          )}
          <div className="ps-8">
            <Link to={"/deliveryscan"}>
              <ButtonComp
                btn={btn}
                width="w-[2rem]"
                height="h-[1rem]"
                text="text-[0.7rem]"
                rounded="rounded-[0.2rem]"
              />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
export default Item;
