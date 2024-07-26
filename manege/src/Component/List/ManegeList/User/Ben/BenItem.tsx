import axios from "axios";
import { Button } from "../../../../../lib/Button/Button";
import { TinyButton } from "../../../../Button/Button";
import { useCallback } from "react";
import { useMutation, useQueries, useQueryClient } from "react-query";

export interface IBenUser {
  id: number;
  nick: string;
}

interface IProps {
  idx: number;
  item: IBenUser;
}

const Item = ({ idx, item }: IProps): JSX.Element => {
  const deletebtn = new Button("정지해제", "bg-red-200");

  const serverURL = process.env.REACT_APP_SERVER_URL;
  const queryClient = useQueryClient();
  const relese = useMutation({
    mutationKey: "releseuser",
    mutationFn: async () => {
      await axios.post(
        `${serverURL}/admin/userunblock/${item.id}`,
        {},
        { withCredentials: true }
      );
    },
    onSuccess(data) {
      queryClient.invalidateQueries("blockdata");
    },
  });

  return (
    <div className="px-5 py-2 flex items-center ">
      <span className="mx-2">{idx}</span>
      <span className="ps-3 flex-1 text-center">{item.nick}</span>
      <div
        onClick={() => {
          relese.mutate();
        }}
      >
        <TinyButton btn={deletebtn} />
      </div>
    </div>
  );
};

export default Item;
