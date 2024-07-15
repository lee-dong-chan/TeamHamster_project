import Item from "./ReportItem";

interface IProps {}

const Report = ({}: IProps): JSX.Element => {
  return (
    <div>
      <div className="px-5 py-2 flex items-center border-b">
        <span>번호</span>
        <span className="flex-1 text-center">사유</span>
        <span className="mx-3  py-2 ">피신고유저</span>
        <span className="mx-3  py-2 w-[4rem] ">상품정보</span>
        <span className="mx-3  py-2 w-[4rem] ">신고삭제</span>
      </div>
      <Item />
    </div>
  );
};

export default Report;
