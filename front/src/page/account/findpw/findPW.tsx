import React, { useEffect, useMemo, useState } from "react";

import axios from "axios"; // Axios import 추가
import LargeButton from "../../../Component/Button/Button";
import { Button } from "../../../lib/Button/Button";
import { box, center } from "../../../lib/styles";
import { useMutation } from "react-query";

interface IProps {}

const FindPW = ({}: IProps): JSX.Element => {
  const [userId, setUserId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phoneNum, setPhoneNum] = useState<string>("");
  const serverUrl = useMemo(() => {
    return process.env.REACT_APP_SERVER_URL;
  }, []);
  const handleFindPW = async (e: React.FormEvent) => {
    e.preventDefault(); // 기본 폼 제출 방지

    if (!userId || !name || !phoneNum) alert("모든 필드를 입력하세요.");
    return;
  };
  const response = useMutation({
    mutationKey: "findpw",
    mutationFn: async () => {
      const { data } = await axios.post(
        `${serverUrl}/findpw`,
        {
          name: name,
          mobile: phoneNum,
          email: userId,
        },
        { withCredentials: true }
      );
      return data;
    },
    onSuccess(data) {
      // if (response.data.success) {
      //   alert("비밀번호 찾기 요청이 성공적으로 처리되었습니다.");
      // } else {
      //   alert("비밀번호를 찾을 수 없습니다: " + response.data.message);
      // }
    },
    onError(error) {
      console.error("비밀번호 찾기 요청 중 오류 발생:", error);
    },
  });

  console.log(response.data);
  return (
    <div>
      <div className={`${box} ${center}`}>
        <div className="rounded-lg w-full ">
          <h2 className="text-2xl font-bold text-center text-orange-500 mt-10">
            햄스터 마켓
          </h2>
          <h2 className="text-2xl font-bold text-center mb-10">
            비밀번호 찾기
          </h2>
          <form onSubmit={handleFindPW}>
            <div className="p-2 mb-4 border rounded">
              <input
                className="w-[100%] outline-none"
                type="text"
                placeholder="아이디"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>
            <div className=" p-2 mb-4 border rounded">
              <input
                className="w-[100%] outline-none"
                type="text"
                placeholder="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className=" p-2 mb-4 border rounded">
              <input
                className="w-[100%] outline-none"
                type="text"
                placeholder="휴대폰번호"
                value={phoneNum}
                onChange={(e) => setPhoneNum(e.target.value)}
              />
            </div>

            <div className="my-[6rem] flex">
              <div className="text-[1.5rem]">비밀번호 변경</div>
              <input className="p-2 border"></input>
            </div>

            <div
              onClick={(e) => {
                handleFindPW(e);
                response.mutate();
              }}
            >
              <LargeButton
                btn={new Button("비밀번호 찾기", "bg-amber-300 w-auto")}
              ></LargeButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FindPW;
