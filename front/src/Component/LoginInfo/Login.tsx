import { Link } from "react-router-dom";
import { useBreakPoint } from "../../CustomHook/BreakPoint";
import { center } from "../../lib/styles";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Modal } from "../../Context/Modal";
import axios from "axios";
import { IUserDatas } from "../../lib/interFace";
import { errUserDatas } from "../../lib/errors";

interface IProps {
  setUserLogin: React.Dispatch<React.SetStateAction<boolean>>;
  userDatas: IUserDatas;
}

const Login = ({ setUserLogin, userDatas }: IProps): JSX.Element => {
  const { isdesktop, ismobile } = useBreakPoint();
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const setModal = useSetRecoilState(Modal);

  const { admin, delivery, id, nick, point } = userDatas.login
    ? userDatas.login
    : errUserDatas.login;

  //funcs
  const opensearch = () => {
    setModal("mobilesearch");
  };
  const logOut = async () => {
    await axios
      .post(`${serverUrl}/logout`, {}, { withCredentials: true })
      .then((data) => {
        console.log(data);
        setUserLogin(false);
      })
      .catch((err) => {
        console.log("logout err", err);
      });
  };

  //
  return (
    <div className={`${center} gap-4 text-gray-500 `}>
      {isdesktop && (
        <div>
          <div className="">{`${nick}님`}</div>
          <div className="">{`보유포인트:${point}포인트`}</div>
          <div
            onClick={logOut}
            className={`${center} w-[5rem] border rounded bg-blue-100 cursor-pointer`}
          >
            로그아웃
          </div>
        </div>
      )}
      {ismobile && (
        <div className="flex items-center gap-3">
          <div className="text-white">{nick}</div>
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
