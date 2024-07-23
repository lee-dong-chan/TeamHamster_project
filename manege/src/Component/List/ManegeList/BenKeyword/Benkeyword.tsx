import { IData } from "../../../../page/manege/benkeyword";
import Item, { IKeyword } from "./BenKeywordItem";

interface IProps {
  data?: IData;
}

const BenKeyWord = ({ data }: IProps): JSX.Element => {
  console.log(data);
  return (
    <div>
      <div className="px-5 py-2 flex items-center border-b">
        <span>번호</span>
        <span className="flex-1 text-center">금지키워드</span>
        <span className="mx-3  py-2 w-[4rem] ">신고삭제</span>
      </div>
      <div>
        {data &&
          data.Keyword.map((item: IKeyword, idx: number) => (
            <Item key={idx} idx={idx + 1} item={item} />
          ))}
      </div>
    </div>
  );
};

export default BenKeyWord;
