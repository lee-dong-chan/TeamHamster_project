import { useState } from "react";
import { Button } from "../../../../lib/Button/Button";
import { TinyButton } from "../../../Button/Button";
import axios from "axios";

export interface IKeyword {
  id: number;
  benkeyword: string;
}

interface IProps {
  item: IKeyword;
  idx: number;
}

const Item = ({ item, idx }: IProps): JSX.Element => {
  const deletebtn = new Button("삭제", "bg-red-200");

  const delKeyword = async () => {
    try {
      await axios.post(`http://localhost/admin/keyword/${item.id}`, {
        deleteid: item.id,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="px-5 py-2 flex items-center ">
      <span className="mx-2">{idx}</span>
      <span className="ps-3 flex-1 text-center">{item.benkeyword}</span>
      <div onClick={delKeyword}>
        <TinyButton btn={deletebtn} />
      </div>
    </div>
  );
};

export default Item;
