import React, { ChangeEvent, useCallback, useMemo, useState } from "react";

import axios from "axios"; // Axios import 추가
import LargeButton from "../../../Component/Button/Button";
import { Button } from "../../../lib/Button/Button";
import { box, center, mobilebox } from "../../../lib/styles";
import { useMutation } from "@tanstack/react-query";
import { useBreakPoint } from "../../../CustomHook/BreakPoint";
import { useSetRecoilState } from "recoil";
import { Modalcontent, Modalstate } from "../../../Context/SystemModal/Modal";
import { useNavigate } from "react-router-dom";

const FindPW = (): JSX.Element => {
  const setsystemonoff = useSetRecoilState(Modalstate);
  const setModalcontent = useSetRecoilState(Modalcontent);
  const { ismobile, isdesktop } = useBreakPoint();
  const [userId, setUserId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phoneNum, setPhoneNum] = useState<string>("");
  const [changepw, setpw] = useState<string>("");
  const navigate = useNavigate();

  const change = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setpw(e.target.value);
  }, []);

  const serverUrl = useMemo(() => {
    return process.env.REACT_APP_SERVER_URL;
  }, []);
  const handleFindPW = async (e: React.FormEvent) => {
    e.preventDefault(); // 기본 폼 제출 방지
  };
  const response = useMutation({
    mutationKey: ["findpw"],
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

    onError() {
      setsystemonoff(true);
      setModalcontent("findpwfalil");
    },
  });

  const changepassword = useMutation({
    mutationKey: ["changepw"],
    mutationFn: async () => {
      const { data } = await axios.post(
        `${serverUrl}/updatepw`,
        {
          pw: changepw,
        },
        { withCredentials: true }
      );
      return data;
    },
    onSuccess() {
      setsystemonoff(true);
      setModalcontent("changesucsess");
    },
    onError() {
      setsystemonoff(true);
      setModalcontent("changefail");
    },
  });
  const emailReg = /^[a-z0-9가-힣]+@[a-z]+\.[a-z]{2,3}$/;
  console.log(response.data);
  console.log(changepw);
  return (
    <div>
      <div
        className={`${isdesktop && `${box} ${center}`} ${
          ismobile && `${mobilebox}`
        }`}
      >
        <div className="rounded-lg w-full h-[41rem] ">
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
            {userId !== "" && emailReg.test(userId) === false && (
              <div className="text-red-500">
                이메일 형식에 맞추어 입력해 주세요
              </div>
            )}
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
                placeholder="휴대폰번호 -를 제외하고 입력해주세요"
                value={phoneNum}
                onChange={(e) => setPhoneNum(e.target.value)}
              />
            </div>

            {response.data?.result === "ok" && (
              <div className="my-[6rem] flex items-center gap-3">
                <div className="text-[1.5rem]">비밀번호 변경:</div>
                <input
                  className=" p-2 flex-1 border"
                  placeholder="변경할 비밀번호"
                  onChange={change}
                  type="password"
                ></input>

                <div
                  onClick={() => {
                    changepassword.mutate();
                    navigate("/login");
                  }}
                  className="border p-2 rounded  bg-orange-200 text-white"
                >
                  확인
                </div>
              </div>
            )}

            <div
              onClick={(e) => {
                handleFindPW(e);
                if (userId !== "" && emailReg.test(userId)) {
                  response.mutate();
                }
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
