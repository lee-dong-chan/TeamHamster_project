import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../lib/Button/Button";
import { TinyButton } from "../Button/Button";
import { IUserDatas } from "../../lib/interFace";

interface IProps {
  userDatas: IUserDatas;
}

const Maneger = ({ userDatas }: IProps): JSX.Element => {
  const navigate = useNavigate();
  const manege = () => {
    window.location.replace("http://localhost:8000/manege/report");
  };
  const btn = new Button("관리자 페이지", "bg-orange-400");
  return (
    <div className="flex flex-col items-center">
      <div> {userDatas.login?.nick} 관리자님 환영합니다.</div>
      <div className="flex items-center">
        <div onClick={manege}>
          <TinyButton btn={btn} />
        </div>
        <div>
          <Link to={`/mystore?id=${userDatas.login?.id}`}>
            <div className="ms-2 px-3 py-1 border rounded bg-blue-200 text-white">
              내정보
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Maneger;
