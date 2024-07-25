import axios from "axios";
import { Button } from "../../../../lib/Button/Button";
import { TinyButton } from "../../../Button/Button";
import { Link, Navigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { ChangeEvent, useState } from "react";

interface IProps {
  item: IUser;
  idx: number;
}

export interface IUser {
  id: number;
  nick: string;
}

const Item = ({ item, idx }: IProps): JSX.Element => {
  const [superadmin, setsuperadmin] = useState(true);

  const change = () => {
    setsuperadmin(!superadmin);
  };
  console.log(superadmin);

  return (
    <div className="px-5 py-2 flex items-center ">
      <span className="mx-2">{idx}</span>
      <span className="ps-3 flex-1 text-center truncate ">{item.nick}</span>
      <div className="me-10 gap-5">
        {
          <input
            className="mx-8"
            type="checkbox"
            checked={superadmin}
            onClick={change}
          ></input>
        }
        {<input className="mx-8" name="auth" type="checkbox"></input>}
        {
          <input
            className="ms-12"
            name="auth"
            value={"delivery"}
            type="checkbox"
          ></input>
        }
      </div>
    </div>
  );
};

export default Item;
