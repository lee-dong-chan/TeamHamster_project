import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useMemo } from "react";
import axios from "axios";

const callBackUrl: string = `${process.env.REACT_APP_BASE_URL}/NaverLoding`;
const serverOAuthCallbackUrl = process.env.REACT_APP_SERVER_OAUTH_CALLBACK_URL;
const clientId: string | undefined = process.env.REACT_APP_N_CLIENT_ID;

export const NaverOAuth = (): JSX.Element => {
  const state: string = useMemo(
    () => Math.random().toString(36).substring(2),
    []
  );

  const naverOAuthUrl: string = useMemo(() => {
    return (
      "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=" +
      clientId +
      "&redirect_uri=" +
      callBackUrl +
      "&state=" +
      state
    );
  }, [state]);

  const loginHandler = () => {
    window.location.href = naverOAuthUrl;
  };

  return (
    <div
      onClick={loginHandler}
      className={`cursor-pointer flex items-center justify-center p-2 bg-green-500 text-white border rounded shadow hover:bg-green-600 w-[100%]`}
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Naver_logo_initial.svg"
        alt="Naver Logo"
        className={`w-6 h-6 mr-2`}
      />
      <span className={`font-medium`}>naver 로그인</span>
    </div>
  );
};

interface INCProp {
  setUserLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NaverCallback = ({ setUserLogin }: INCProp): JSX.Element => {
  const navigate = useNavigate();
  const code: string | null = useMemo(
    () => new URL(window.location.href).searchParams.get("code"),
    []
  );
  const state: string | null = useMemo(
    () => new URL(window.location.href).searchParams.get("state"),
    []
  );

  const naver = useCallback(async () => {
    await axios
      .post(
        `${serverOAuthCallbackUrl}/NaverCallback?code=${code}&state=${state}`,
        { callbackUrl: callBackUrl },
        {
          withCredentials: true,
        }
      )
      .then((data) => {
        //성공시 콜백

        setUserLogin(true);
        console.log(data);
        //성공시 URL
        navigate("/");
      })
      .catch((err) => {
        //실패시 URL

        console.log(err);
        //실패시 URL
        navigate("/");
      });
    //
  }, [navigate, code, state, setUserLogin]);

  useEffect(() => {
    naver();
  }, [naver]);

  console.log("무한돌기 체크");

  return <div>loding</div>;
};
