import Info from "../Component/mypage/Info";
import TodayLog from "../Component/mypage/TodayLog";
import { center, mobilebox } from "../lib/styles";
import { DiGithubAlt } from "react-icons/di";

interface IProps {
  workstate: boolean | undefined;
  camp: string;
}

const MyPage = ({ workstate, camp }: IProps): JSX.Element => {
  return (
    <div className={`py-[2rem] ${mobilebox}`}>
      <div className="py-5 flex items-center gap-5">
        <DiGithubAlt size={30} />
        <span className="text-[1.2rem]">내정보</span>
      </div>
      <Info workstate={workstate} camp={camp} />
      <div className="py-5 text-[1.2rem] font-bold">금일 업무기록</div>
      <TodayLog />
    </div>
  );
};

export default MyPage;
