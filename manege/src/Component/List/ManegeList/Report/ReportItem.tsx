import axios from "axios";
import { Button } from "../../../../lib/Button/Button";
import { TinyButton } from "../../../Button/Button";

import { useMutation, useQueryClient } from "react-query";
import { useSetRecoilState } from "recoil";
import { Modalcontent, Modalstate } from "../../../../Context/Modal/Modal";

export interface IReport {
  id: number;
  content: string;
  username: string;
  productid: number;
}

interface IProps {
  item: IReport;
  idx: number;
}

const Item = ({ item, idx }: IProps): JSX.Element => {
  const setmodalvalue = useSetRecoilState(Modalcontent);
  const setmodalstate = useSetRecoilState(Modalstate);
  const productbtn = new Button("상품", "bg-blue-200");
  const deletebtn = new Button("삭제", "bg-red-200");
  const queryClient = useQueryClient();
  const deletereport = useMutation({
    mutationKey: "delreport",
    mutationFn: async () => {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/admin/report/${item.id}`,
        {
          withCredentials: true,
        }
      );
    },
    onSuccess(data) {
      queryClient.invalidateQueries("reportlist");
      setmodalvalue("delreport");
    },
  });

  const onclick = () => {
    window.location.replace(`http://localhost:3000/product/${item.id}`);
  };
  return (
    <div className="px-5 py-2 flex items-center ">
      <span className="mx-2">{idx}</span>
      <span className="ps-3 flex-1 text-center truncate ">{item.content}</span>
      <span className="px-3 w-[5rem] truncate">{item.username}</span>
      <div onClick={onclick}>
        <TinyButton btn={productbtn} />
      </div>

      <div
        onClick={() => {
          deletereport.mutate();
          setmodalstate(true);
        }}
      >
        <TinyButton btn={deletebtn} />
      </div>
    </div>
  );
};

export default Item;
