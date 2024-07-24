import { useState } from "react";
import { Button } from "../../../../lib/Button/Button";
import { TinyButton } from "../../../Button/Button";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

export interface IKeyword {
  word: string;
}

interface IProps {
  item: IKeyword;
  idx: number;
}

const Item = ({ item, idx }: IProps): JSX.Element => {
  const deletebtn = new Button("삭제", "bg-red-200");
  const queryClient = useQueryClient();

  const delKeyword = useMutation({
    mutationKey: ["delKeyword"],
    mutationFn: async () => {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/admin/delkeyword`, {
        keyword: item.word,
      });
    },
    onSuccess(data) {
      queryClient.invalidateQueries("benlist");
    },
  });

  return (
    <div className="px-5 py-2 flex items-center ">
      <span className="mx-2">{idx}</span>
      <span className="ps-3 flex-1 text-center">{item.word}</span>
      <div
        onClick={() => {
          delKeyword.mutate();
        }}
      >
        <TinyButton btn={deletebtn} />
      </div>
    </div>
  );
};

export default Item;
