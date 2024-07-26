import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { Modal } from "../../Context/Modal";

interface IProps {}

const NotLogin = ({}: IProps): JSX.Element => {
  const setModal = useSetRecoilState(Modal);
  const opensearch = () => {
    setModal("mobilesearch");
  };
  return (
    <div className="flex me-1 gap-1 ">
      <div>
        <div
          className="h-[3rem] w-[3rem] border rounded-]"
          onClick={opensearch}
        >
          <img className="h-[100%]" src="/imgs/listsearch.png"></img>
        </div>
      </div>
      <Link to={"/login"}>
        <div className="px-4 py-2 border bg-blue-100 rounded text-[1.2rem]">
          로그인
        </div>
      </Link>
    </div>
  );
};

export default NotLogin;
