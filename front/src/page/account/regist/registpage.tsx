import { box, center } from "../../../lib/styles";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LargeButton from "../../../Component/Button/Button";
import { Button } from "../../../lib/Button/Button";
import { useBreakPoint } from "../../../CustomHook/BreakPoint";

interface IProps {}

const Regist = ({}: IProps): JSX.Element => {
  const { ismobile, isdesktop } = useBreakPoint();
  const [email, setEmail] = useState("");
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const emailReg = /^[a-z0-9가-힣]+@[a-z]+\.[a-z]{2,3}$/;
  const pwReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,30}$/;
  const nickReg = /^[A-Z|a-z|0-9|ㄱ-ㅎ|가-힣]{2,16}$/;
  const phoneReg = /^\d{2,3}-\d{3,4}-\d{4}$/;

  const navigate = useNavigate();

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();

    if (
      email !== "" &&
      emailReg.test(email) &&
      password !== "" &&
      pwReg.test(password) &&
      !(password.length < 8 || password.length > 30) &&
      checkPassword !== "" &&
      password === checkPassword &&
      nickname !== "" &&
      nickReg.test(nickname) &&
      phone !== "" &&
      phoneReg.test(phone)
    ) {
      // 요청 페이로드 생성
      const payload = {
        email: email,
        pw: password,
        nick: nickname,
        name: name,
        mobile: phone,
      };

      try {
        console.log(payload);
        const response = await axios.post(`${serverUrl}/regist`, payload);
        console.log(response);
        navigate("/login"); // 로그인 페이지로 이동
      } catch (error) {
        console.error("회원가입 오류:", error);
      }
    }
  };

  return (
    <div>
      <div className={`${ismobile && "p-4 "} Box ${center}`}>
        <div className="rounded-lg w-full m">
          <h2 className="text-2xl font-bold text-center text-orange-500 mt-10">
            햄스터 마켓
          </h2>
          <h2 className="text-2xl font-bold text-center mb-10 ">회원가입</h2>
          <form onSubmit={handleSignup}>
            <div className="mb-4">
              <input
                className="w-full p-2 border rounded border-1 border-solid border-gray-950"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일주소"
              />
              {email !== "" && emailReg.test(email) === false && (
                <div className="text-red-500">
                  {`${emailReg.test(email)}`}
                  이메일 형식에 맞추어 입력해 주세요
                </div>
              )}
            </div>
            <div className="mb-4">
              <input
                className="w-full p-2 border rounded border-1 border-solid border-gray-950"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호"
              />

              {password !== "" &&
                pwReg.test(password) === false &&
                (password.length < 8 || password.length > 30 ? (
                  <div className="text-red-500">
                    "비밀번호는 8글자 이상, 30글자 이하로 작성하세요"
                  </div>
                ) : (
                  <div className="text-red-500">
                    "비밀번호는 영어, 특수문자, 숫자를 포함하세요"
                  </div>
                ))}
            </div>
            <div className="mb-4">
              <input
                className="w-full p-2 border rounded border-1 border-solid border-gray-950"
                type="password"
                id="checkPassword"
                value={checkPassword}
                onChange={(e) => setCheckPassword(e.target.value)}
                placeholder="비밀번호 확인"
              />
              {checkPassword !== "" && password !== checkPassword && (
                <div className="text-red-500">
                  비밀번호가 일치하지 않습니다.
                </div>
              )}
            </div>
            <div className="mb-4">
              <input
                className="w-full p-2 border rounded border-1 border-solid border-gray-950"
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름"
              />
            </div>
            <div className="mb-4">
              <input
                className="w-full p-2 border rounded border-1 border-solid border-gray-950"
                type="text"
                id="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="닉네임"
              />
              {nickname !== "" && nickReg.test(nickname) === false && (
                <div className="text-red-500">
                  특수문자 제외 알파벳과 한글로 작성하세요
                </div>
              )}
            </div>
            <div className="mb-20">
              <input
                className="w-full p-2 border rounded border-1 border-solid border-gray-950"
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="휴대폰번호"
              />
              {phone !== "" && phoneReg.test(phone) === false && (
                <div className="text-red-500">
                  전화번호 형식에 맞추어 주세요
                </div>
              )}
            </div>
            <div onClick={handleSignup}>
              <LargeButton
                btn={new Button("회원가입", "bg-amber-300 w-auto")}
              ></LargeButton>
            </div>

            <p className="text-center mt-4">햄스터 마켓 계정이 있으신가요?</p>
            <p className="text-center">
              지금바로{" "}
              <div
                onClick={() => {
                  navigate("/login");
                }}
                className="text-blue-500"
              >
                로그인
              </div>
              하러가기
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Regist;
