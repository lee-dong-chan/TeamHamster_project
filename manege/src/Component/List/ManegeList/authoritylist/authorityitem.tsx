import { useState } from "react";

interface IProps {
  item: IUser;
  idx: number;
  setdata: React.Dispatch<React.SetStateAction<IUser | undefined>>;
}

export interface IUser {
  id: number;
  nick: string;
  admin: boolean;
  superAdmin: boolean;
  delivery: boolean;
}

const Item = ({ item, idx, setdata }: IProps): JSX.Element => {
  const [superstate, setsuper] = useState(item.superAdmin);
  const [adminstate, setadmin] = useState(item.admin);
  const [deliverystate, setdelivery] = useState(item.delivery);

  const superchange = () => {
    setsuper(!superstate);
  };
  const adminchange = () => {
    setadmin(!adminstate);
  };
  const deliverychange = () => {
    setdelivery(!deliverystate);
  };

  const onclick = () => {
    setdata({
      id: item.id,
      nick: item.nick,
      admin: adminstate,
      superAdmin: superstate,
      delivery: deliverystate,
    });
  };

  return (
    <div className="px-5 py-2 flex items-center ">
      <span className="mx-2">{idx}</span>
      <span className="ps-3 flex-1 text-center truncate ">{item.nick}</span>
      <div className="me-10 gap-5">
        {
          <input
            className="mx-8"
            type="checkbox"
            defaultChecked={superstate}
            onClick={superchange}
          ></input>
        }
        {
          <input
            className="mx-8"
            type="checkbox"
            defaultChecked={adminstate}
            onClick={adminchange}
          ></input>
        }
        {
          <input
            className="ms-12"
            type="checkbox"
            defaultChecked={deliverystate}
            onClick={deliverychange}
          ></input>
        }
      </div>
      <div
        onClick={onclick}
        className="border px-3 rounded bg-orange-400 text-white"
      >
        선택
      </div>
    </div>
  );
};

export default Item;
