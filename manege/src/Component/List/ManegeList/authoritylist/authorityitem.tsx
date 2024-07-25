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
  // admin: boolean;
  // superAdmin: boolean;
  // delivery: boolean;
}

const Item = ({ item, idx }: IProps): JSX.Element => {
  // const [superstate, setsuper] = useState(item.superAdmin);
  // const [adminstate, setadmin] = useState(item.admin);
  // const [deliverystate, setdelivery] = useState(item.delivery);

  // const superchange = () => {
  //   setsuper(!item.superAdmin);
  // };
  // const adminchange = () => {
  //   setadmin(!item.admin);
  // };
  // const deliverychange = () => {
  //   setdelivery(!item.delivery);
  // };

  return (
    <div className="px-5 py-2 flex items-center ">
      <span className="mx-2">{idx}</span>
      <span className="ps-3 flex-1 text-center truncate ">{item.nick}</span>
      <div className="me-10 gap-5">
        {/* {
          <input
            className="mx-8"
            type="checkbox"
            checked={superstate}
            onClick={superchange}
          ></input>
        }
        {
          <input
            className="mx-8"
            type="checkbox"
            checked={adminstate}
            onClick={adminchange}
          ></input>
        }
        {
          <input
            className="ms-12"
            type="checkbox"
            checked={deliverystate}
            onClick={deliverychange}
          ></input>
        } */}
      </div>
    </div>
  );
};

export default Item;
