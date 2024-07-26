import React, { FC, useEffect, useMemo, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { box, center } from "../../lib/styles";
import { LargeButton } from "../../Component/Button/Button";
import { Button } from "../../lib/Button/Button";

interface IProps {
  userDataCheck: () => void;
  points: number;
}

const Point = ({ points, userDataCheck }: IProps): JSX.Element => {
  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [pointMulValue, setPointMulValue] = useState<number>();
  const serverUrl = useMemo(() => {
    return process.env.REACT_APP_SERVER_URL;
  }, []);
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAmount(Number(e.target.value));
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(Number(e.target.value));
  };

  const handleRecharge = async () => {
    const rechargeAmount = Number(customAmount) || selectedAmount;
    if (!isNaN(rechargeAmount) && rechargeAmount > 0) {
      console.log(rechargeAmount);

      // Axios를 사용하여 포인트 충전 요청
      await axios
        .post(
          `${serverUrl}/point`,
          {
            pointvalue: rechargeAmount,
            history: "포인트 충전 페이지",
          },
          { withCredentials: true }
        )
        .then((data) => {
          console.log(data);
          if (data.status) {
            setCustomAmount("");
            userDataCheck();
          } else {
            alert("충전 실패: " + data.data);
          }
        })
        .catch((error) => {
          console.error("충전 요청 중 오류 발생:", error);
          alert("충전 요청 중 오류가 발생했습니다.");
        });
    } else {
      alert("유효한 금액을 입력하세요.");
    }
  };

  interface IPointRes {
    point: {
      pointPercent: number;
    };
  }
  const pointMultiValueGet = async () => {
    await axios
      .post(`${serverUrl}/pointpercent`, {}, { withCredentials: true })
      .then((data: AxiosResponse<IPointRes>) => {
        setPointMulValue(data.data.point.pointPercent / 1000);
      });
  };

  useEffect(() => {
    pointMultiValueGet();
  }, []);

  return (
    <div className="p-8">
      <div className={`Box ${center}`}>
        <div className="rounded-lg  w-full m">
          <h2 className="text-2xl font-bold text-center text-orange-500 mt-10">
            햄스터 마켓
          </h2>

          <h2 className="text-2xl font-bold text-center mb-10">포인트충전</h2>
          <p className=" mb-4">
            현재 보유포인트: <span className="font-bold">{points} 포인트</span>
          </p>
          <div className="mb-4">
            <label className="flex items-center mb-4">
              <input
                type="radio"
                name="amount"
                value="1000"
                checked={selectedAmount === 1000}
                onChange={handleAmountChange}
                className="mr-2"
              />
              1000포인트
            </label>
            <label className="flex items-center mb-4">
              <input
                type="radio"
                name="amount"
                value="5000"
                checked={selectedAmount === 5000}
                onChange={handleAmountChange}
                className="mr-2"
              />
              5000포인트
            </label>
            <label className="flex items-center mb-4">
              <input
                type="radio"
                name="amount"
                value="10000"
                checked={selectedAmount === 10000}
                onChange={handleAmountChange}
                className="mr-2"
              />
              10000포인트
            </label>
            <label className="flex items-center mb-4">
              <input
                type="radio"
                name="amount"
                value="50000"
                checked={selectedAmount === 50000}
                onChange={handleAmountChange}
                className="mr-2"
              />
              50000포인트
            </label>
            <div className="flex items-center mb-4">
              <label className="mr-2">기타 포인트 입력:</label>
              <input
                type="number"
                value={customAmount}
                onChange={handleCustomAmountChange}
                placeholder="금액 입력"
                className="border border-gray-300 p-2 rounded-lg"
              />
            </div>
          </div>
          <p className="text-xl font-bold mb-4">
            <div>
              포인트 배율:{" "}
              <span className="text-orange-500">{pointMulValue}</span>
            </div>

            {pointMulValue && (
              <div>
                결제금액:{" "}
                <span className="text-orange-500">
                  {selectedAmount / pointMulValue}원
                </span>
              </div>
            )}
          </p>

          <div onClick={handleRecharge}>
            <LargeButton
              btn={new Button("결제하기", "bg-amber-300 w-auto")}
            ></LargeButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Point;
