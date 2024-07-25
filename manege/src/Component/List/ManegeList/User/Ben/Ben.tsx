import { useMutation } from "react-query";
import Item, { IBenUser } from "./BenItem";
import axios from "axios";

interface IProps {
  data?: IBenUser[];
}

const Ben = ({ data }: IProps): JSX.Element => {
  return (
    <div>
      <div className="px-5 py-2 flex items-center border-b">
        <span>번호</span>
        <span className="flex-1 text-center">정지유저</span>
        <span className="mx-3  py-2 w-[4rem] ">유저처분</span>
      </div>
      {data &&
        data.map((item: IBenUser, idx: number) => (
          <Item key={idx} item={item} idx={idx + 1} />
        ))}
    </div>
  );
};

export default Ben;
