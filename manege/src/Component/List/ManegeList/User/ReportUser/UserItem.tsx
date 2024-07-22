import { useCallback } from "react";
import { Button } from "../../../../../lib/Button/Button";
import { TinyButton } from "../../../../Button/Button";
import axios from "axios";

export interface IReportUser {
  id: number;
  name: string;
}

interface IProps {
  item: IReportUser;
  idx: number;
}

const Item = ({ item, idx }: IProps): JSX.Element => {
  const benbtn = new Button("정지", "bg-red-200");

  const benuser = useCallback(async () => {
    try {
      await axios.post(`http://localhost/admin/userblock/${item.id}`, {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div className="px-5 py-2 flex items-center ">
      <span className="mx-2">{idx}</span>
      <span className="ps-3 flex-1 text-center truncate ">{item.name}</span>
      <div onClick={benuser}>
        <TinyButton btn={benbtn} />
      </div>
    </div>
  );
};

export default Item;
