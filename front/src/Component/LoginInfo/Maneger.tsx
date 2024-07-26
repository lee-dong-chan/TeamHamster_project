import { Link } from "react-router-dom";
import { Button } from "../../lib/Button/Button";
import { TinyButton } from "../Button/Button";
import { IUserDatas } from "../../lib/interFace";

interface IProps {
  userDatas: IUserDatas;
}

const Maneger = ({ userDatas }: IProps): JSX.Element => {
  const btn = new Button("관리자 페이지", "bg-orange-400");
  return (
    <div className="flex flex-col items-center">
      <div> {userDatas.login?.nick} 관리자님 환영합니다.</div>
      <Link to={"/manege/report"}>
        <TinyButton btn={btn} />
      </Link>
    </div>
  );
};

export default Maneger;
