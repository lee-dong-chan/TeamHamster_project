import { Link } from "react-router-dom";
import ButtonComp, { LargeButton } from "../Component/Button/Button";
import { Button } from "../lib/Button/Button";
import { center, mobilebox } from "../lib/styles";

import { List } from "../Component/List/List";
import { useEffect, useState } from "react";
import { PickCheck, Picklist } from "../Component/List/item/Item";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

interface IData {
  product: [
    {
      id: number;
      itemState: string;
      SellAddress: {
        detailAddress: string;
        Address: {
          address: string;
        };
      };
    }
  ];
}
interface IProduct {
  id: number;
  itemState: string;
  SellAddress: {
    detailAddress: string;
    Address: {
      address: string;
    };
  };
}

interface IProps {
  liststate: number;
  checklist(item: number): void;
}
const PickUpList = ({ liststate, checklist }: IProps): JSX.Element => {
  const [lastdata, setlastdata] = useState<Picklist[] | undefined>([]);
  const test2: Picklist[] = [
    { id: 1, pickadress: "어딘가", state: "픽업대기" },
    { id: 2, pickadress: "무언가", state: "픽업완료" },
  ];
  const queryClient = useQueryClient();

  const mypickup = useMutation({
    mutationKey: ["mypickup"],
    mutationFn: async () => {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/delivery/pickuplist`,
        {},
        { withCredentials: true }
      );

      const product = data?.product;
      const productlist = product?.map((data: IProduct) => {
        const outData: Picklist = {
          id: data.id,
          pickadress: data.SellAddress.Address.address + data.SellAddress.detailAddress,
          state: data.itemState,
        };
        return outData;
      });
      setlastdata(productlist);
    },
  });

  useEffect(() => {
    mypickup.mutate();
    checklist(2);
  }, []);
  const btn = new Button("확인", "bg-blue-200");
  return (
    <div className={`${mobilebox} flex flex-col items-center`}>
      <div className="py-3 text-[1.2rem] font-bold">픽업 목록</div>
      <div className={`mt-5 my-[6rem]`}>
        <List liststate={liststate} list2={lastdata} />
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
