import { Link } from "react-router-dom";
import { useBreakPoint } from "../../CustomHook/BreakPoint";
import { center } from "../../lib/styles";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Modal } from "../../Context/Modal";

interface IProps {}

const Login = ({}: IProps): JSX.Element => {
  const { isdesktop, ismobile } = useBreakPoint();

  const setModal = useSetRecoilState(Modal);
  const opensearch = () => {
    setModal("mobilesearch");
  };
  return (
    <div className={`${center} gap-4 text-gray-500 `}>
      {isdesktop && (
        <div>
          <div className="">{`${"??"}님`}</div>
          <div className="">{`보유포인트:${"100"}포인트`}</div>
          <div className={`${center} w-[5rem] border rounded bg-blue-100`}>
            로그아웃
          </div>
        </div>
      )}
      {ismobile && (
        <div className="flex items-center gap-3">
          <div className="text-white">이동찬님</div>
          <div
            className="h-[3rem] w-[3rem] border rounded-]"
            onClick={opensearch}
          >
            <img className="h-[100%]" src="/imgs/listsearch.png"></img>
          </div>
        </div>
      )}
      {isdesktop && (
        <div className="flex gap-3">
          <Link to={"/point"}>
            <div className="px-2 py-3 w-[5.5rem] bg-blue-100 border rounded">
              포인트충전
            </div>
          </Link>
          <Link to={"/mystore"}>
            <div
              className={`${center} px-2 py-3 w-[5rem] bg-blue-200 border rounded`}
            >
              내상점
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Login;
