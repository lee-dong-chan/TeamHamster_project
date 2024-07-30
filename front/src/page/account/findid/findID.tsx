import React, { useState } from "react";
import axios from "axios";
import LargeButton from "../../../Component/Button/Button";
import { Button } from "../../../lib/Button/Button";
import { center } from "../../../lib/styles";

interface IProps {}

const FindID = ({}: IProps): JSX.Element => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleFindID = async () => {
    if (!name || !phone) {
      alert("이름과 휴대폰 번호를 입력하세요.");
      return;
    }

    try {
      const response = await axios.post("/findemail", { name, phone });
      if (response.data.success) {
        alert(`아이디: ${response.data.id}`);
      } else {
        alert("아이디를 찾을 수 없습니다: " + response.data.message);
      }
    } catch (error) {
      console.error("아이디 찾기 요청 중 오류 발생:", error);
      alert("아이디 찾기 요청 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <div className={`Box ${center}`}>
        <div className="rounded-lg w-full m">
          <h2 className="text-2xl font-bold text-center text-orange-500 mt-10">
            햄스터 마켓
          </h2>
          <h2 className="text-2xl font-bold text-center mb-10">아이디 찾기</h2>
          <label>
            <div className="mb-4 static">
              <input
                type="text"
                placeholder="이름"
                value={name}
                onChange={(e: any) => setName(e.target.value)}
              />
            </div>
          </label>
          <label>
            <div className="mb-4">
              <input
                type="text"
                placeholder="휴대폰번호"
                value={phone}
                onChange={(e: any) => setPhone(e.target.value)}
              />
              <button className="absolute right-20 z-10">인증</button>
            </div>
          </label>
          <div onClick={handleFindID}>
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
