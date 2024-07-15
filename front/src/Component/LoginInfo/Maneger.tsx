import { Link } from "react-router-dom";
import Button from "../../lib/Button/Button";
import TinyButton from "../Button/TinyButton";

interface IProps {
  setpage(): void;
}

const Maneger = ({ setpage }: IProps): JSX.Element => {
  const btn = new Button("관리자 페이지", "bg-orange-400");
  return (
    <div className="flex flex-col items-center">
      <div>???관리자님 환영합니다.</div>
      <Link to={"/manege/report"} onClick={setpage}>
        <TinyButton btn={btn} />
      </Link>
    </div>
  );
};

export default Maneger;
