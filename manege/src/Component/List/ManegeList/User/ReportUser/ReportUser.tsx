import Item, { IReportUser } from "./UserItem";

interface IProps {
  data?: IReportUser[];
}

const ReportUser = ({ data }: IProps): JSX.Element => {
  return (
    <div>
      <div className="px-5 py-2 flex items-center border-b">
        <span>번호</span>
        <span className="flex-1 text-center">신고 10회누적 유저</span>
        <span className="mx-3  py-2 w-[4rem] ">유저처분</span>
      </div>
      {data &&
        data.map((item: IReportUser, idx: number) => (
          <Item key={idx} idx={idx + 1} item={item} />
        ))}
    </div>
  );
};

export default ReportUser;
