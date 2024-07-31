import React, { useState } from "react";
import axios from "axios";
import LargeButton from "../../../Component/Button/Button";
import { Button } from "../../../lib/Button/Button";
import { box, center, mobilebox } from "../../../lib/styles";
import { useBreakPoint } from "../../../CustomHook/BreakPoint";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { Modalcontent, Modalstate } from "../../../Context/SystemModal/Modal";

interface IProps {}

const FindID = ({}: IProps): JSX.Element => {
  const setsystemonoff = useSetRecoilState(Modalstate);
  const setModalcontent = useSetRecoilState(Modalcontent);
  const navigate = useNavigate();
  const { isdesktop, ismobile } = useBreakPoint();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const response = useMutation({
    mutationKey: ["findID"],
    mutationFn: async () => {
      const { data } = await axios.post(
        `${serverUrl}/findemail`,
        { name: name, mobile: phone },
        { withCredentials: true }
      );
      return data;
    },
    onSuccess(data) {
      setModalcontent("sucsessid");
      setsystemonoff(true);
    },
    onError() {
      setModalcontent("failid");
      setsystemonoff(true);
    },
  });

  console.log(response.data);

  return (
    <div>
      <div
        className={`h-[41rem] ${isdesktop && `${box} ${center}`}   ${
          ismobile && `${mobilebox} ${center}`
        }`}
      >
        <div className="rounded-lg w-full m">
          <h2 className="text-2xl font-bold text-center text-orange-500 mt-10">
            햄스터 마켓
          </h2>
          <h2 className="text-2xl font-bold text-center mb-10">아이디 찾기</h2>
          <label>
            <div className="p-2 mb-4 static border">
              <input
                className="w-[100%] outline-none"
                type="text"
                placeholder="이름"
                value={name}
                onChange={(e: any) => setName(e.target.value)}
              />
            </div>
          </label>
          <label>
            <div className="p-2 mb-4 border flex">
              <input
                className="w-[100%] outline-none"
                type="text"
                placeholder="휴대폰번호 -를 제외하고 입력"
                value={phone}
                onChange={(e: any) => setPhone(e.target.value)}
              />
              <button className="w-[4rem]">인증</button>
            </div>
          </label>
          <div
            onClick={() => {
              if (name && phone) {
                response.mutate();
              }
            }}
          >
            {response.data?.email && (
              <div className="my-[4rem]">
                <div className="text-[1.3rem]">
                  유저아이디:
                  <span className="p-3 text-orange-500">
                    {response.data?.email}
                  </span>
                </div>
                <span
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="text-blue-500 underline"
                >
                  로그인하러가기
                </span>
              </div>
            )}
            <LargeButton
              btn={new Button("아이디 찾기", "bg-amber-300 w-auto")}
              // 버튼 클릭 시 아이디 찾기 함수 호출
            ></LargeButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindID;
