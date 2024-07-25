import { NavigateFunction, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const callBackUrl: string = `${process.env.REACT_APP_BASE_URL}/NaverLoding`;

const serverOAuthCallbackUrl = process.env.REACT_APP_SERVER_OAUTH_CALLBACK_URL;

export const NaverOAuth = (): JSX.Element => {
  const clientId: string | undefined = process.env.REACT_APP_N_CLIENT_ID;
  const state: string = Math.random().toString(36).substring(2);

  const naverOAuthUrl: string =
    "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=" +
    clientId +
    "&redirect_uri=" +
    callBackUrl +
    "&state=" +
    state;

  const loginHandler = () => {
    window.location.href = naverOAuthUrl;
  };

  return (
    <button
      onClick={loginHandler}
      className={`flex items-center justify-center p-2 bg-green-500 text-white border rounded shadow hover:bg-green-600 w-[100%]`}
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Naver_logo_initial.svg"
        alt="Naver Logo"
        className={`w-6 h-6 mr-2`}
      />
      <span className={`font-medium`}>naver 로그인</span>
    </button>
  );
};

export const NaverCallback = (): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();
  const code: string | null = new URL(window.location.href).searchParams.get(
    "code"
  );
  const state: string | null = new URL(window.location.href).searchParams.get(
    "state"
  );

  const naver = async (): Promise<void> => {
    await axios
      .post(
        `${serverOAuthCallbackUrl}/NaverCallback?code=${code}&state=${state}`,
        { callbackUrl: callBackUrl },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        //성공시 콜백

        //성공시 URL
        navigate("/");
      })
      .catch(() => {
        //실패시 URL

        //실패시 URL
        navigate("/");
      });
    //
  };

  useEffect(() => {
    naver();
  }, []);

  return <div>loding</div>;
};
