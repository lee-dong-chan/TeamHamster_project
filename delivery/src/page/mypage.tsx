import { useMutation } from "react-query";
import Info from "../Component/mypage/Info";
import TodayLog from "../Component/mypage/TodayLog";
import { center, mobilebox } from "../lib/styles";
import { DiGithubAlt } from "react-icons/di";
import { IUser } from "../lib/layout";

interface IProps {
  workstate: boolean | undefined;
  camp: string;
  user: IUser;
}

const MyPage = ({ workstate, camp, user }: IProps): JSX.Element => {
  return (
    <div className={`py-[2rem] ${mobilebox} h-[41rem]`}>
      <div className="py-5 flex items-center gap-5">
        <DiGithubAlt size={30} />
        <span className="text-[1.2rem]">내정보</span>
      </div>
      <Info workstate={workstate} camp={camp} user={user} />
      <div className="py-5 text-[1.2rem] font-bold">금일 업무기록</div>
      <TodayLog />
    </div>
  );
};

export default MyPage;
