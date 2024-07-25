import Item, { IReport } from "./ReportItem";

interface IProps {
  data?: IReport[];
}

const Report = ({ data }: IProps): JSX.Element => {
  return (
    <div>
      <div className="px-5 py-2 flex items-center border-b">
        <span>번호</span>
        <span className="flex-1 text-center">사유</span>
        <span className="mx-3  py-2 ">피신고유저</span>
        <span className="mx-3  py-2 w-[4rem] ">상품정보</span>
        <span className="mx-3  py-2 w-[4rem] ">신고삭제</span>
      </div>
      {data &&
        data.map((item: IReport, idx: number) => (
          <Item key={idx} item={item} idx={idx + 1} />
        ))}
    </div>
  );
};

export default Report;
