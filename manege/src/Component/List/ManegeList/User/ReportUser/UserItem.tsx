import { Button } from "../../../../../lib/Button/Button";
import { TinyButton } from "../../../../Button/Button";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useSetRecoilState } from "recoil";
import { Modalcontent, Modalstate } from "../../../../../Context/Modal/Modal";

export interface IReportUser {
  id: number;
  nick: string;
}

interface IProps {
  item: IReportUser;
  idx: number;
}

const Item = ({ item, idx }: IProps): JSX.Element => {
  const modalvalue = useSetRecoilState(Modalcontent);
  const onoffModal = useSetRecoilState(Modalstate);

  const benbtn = new Button("정지", "bg-red-200");
  const queryClient = useQueryClient();
  const benuser = useMutation({
    mutationKey: "benuser",
    mutationFn: async () => {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/admin/userblock/${item.id}`,
        {},
        {
          withCredentials: true,
        }
      );
    },
    onSuccess(data) {
      modalvalue("benuser");
      queryClient.invalidateQueries("manydata");
      queryClient.invalidateQueries("blockdata");
    },
  });

  return (
    <div className="px-5 py-2 flex items-center ">
      <span className="mx-2">{idx}</span>
      <span className="ps-3 flex-1 text-center truncate ">{item.nick}</span>
      <div
        onClick={() => {
          benuser.mutate();
          onoffModal(true);
        }}
      >
        <TinyButton btn={benbtn} />
      </div>
    </div>
  );
};

export default Item;
