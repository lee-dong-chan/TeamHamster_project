import { useState } from "react";
import { center } from "../../../lib/styles";
import axios from "axios";
import { Modal } from "../../../Context/Modal";
import { useSetRecoilState } from "recoil";
import { useLocation, useNavigate } from "react-router-dom";

interface IProps {
  id: number | undefined;
  img: string | undefined;
}

const ReviewWrite = ({ id, img }: IProps): JSX.Element => {
  const imgbase = process.env.REACT_APP_IMG_BASE;
  const navigate = useNavigate();
  const loca = useLocation();
  const callbackUrl = `${loca.pathname}${loca.search}`;

  const [starValue, setStarValue] = useState<number>(1);
  const [contentValue, setContentValue] = useState<string>();

  const ModalState = useSetRecoilState(Modal);

  const serverUrl = process.env.REACT_APP_SERVER_URL;

  //func

  const reviewWrite = async (
    starValue: number,
    contentValue: string | undefined
  ) => {
    if (contentValue) {
      axios
        .post(
          `${serverUrl}/reviewWrite/${id}`,
          {
            star: starValue,
            content: contentValue,
          },
          { withCredentials: true }
        )
        .then((data) => {
          console.log(data);
          setStarValue(1);
          setContentValue(undefined);
          ModalState(undefined);
          navigate(`${callbackUrl}`);
        })
        .catch((err) => {
          console.log(err);
          setStarValue(1);
          setContentValue(undefined);
          ModalState(undefined);
          navigate(`${callbackUrl}`);
        });
    }
  };

  return (
    <div className={`p-4 [&>*]:pb-6`}>
      <div className={`${center} font-medium text-xl`}>리뷰작성</div>
      <div className={`flex justify-evenly`}>
        {/* 이미지 */}
        <div className={`w-[170px] h-[170px] overflow-hidden`}>
          <img
            src={`${imgbase}${img}`}
            alt="Product img"
            className="bg-cover"
          />
        </div>
        {/* 별 */}
        <div className={`${center} flex-wrap`}>
          <div className="flex gap-1">
            <div
              onClick={() => {
                setStarValue(1);
              }}
              className={`text-4xl ${
                starValue >= 1 ? `text-yellow-300` : `text-gray-400`
              }`}
            >
              ★
            </div>
            <div
              onClick={() => {
                setStarValue(2);
              }}
              className={`text-4xl ${
                starValue >= 2 ? `text-yellow-300` : `text-gray-400`
              }`}
            >
              ★
            </div>
            <div
              onClick={() => {
                setStarValue(3);
              }}
              className={`text-4xl ${
                starValue >= 3 ? `text-yellow-300` : `text-gray-400`
              }`}
            >
              ★
            </div>
            <div
              onClick={() => {
                setStarValue(4);
              }}
              className={`text-4xl ${
                starValue >= 4 ? `text-yellow-300` : `text-gray-400`
              }`}
            >
              ★
            </div>
            <div
              onClick={() => {
                setStarValue(5);
              }}
              className={`text-4xl ${
                starValue >= 5 ? `text-yellow-300` : `text-gray-400`
              }`}
            >
              ★
            </div>
          </div>
          <div className={`w-[100%] text-3xl text-red-300 ${center}`}>
            {starValue} 점
          </div>
        </div>
        {/*  */}
      </div>
      <textarea
        onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
          setContentValue(e.currentTarget.value);
        }}
        className={`w-[100%] h-[300px] resize-none`}
        placeholder="리뷰작성"
      />
      <div className={`${center}`}>
        <button
          onClick={() => {
            reviewWrite(starValue, contentValue);
          }}
          className={`bg-amber-600 px-8 py-2 mt-10 text-white`}
        >
          리뷰 쓰기
        </button>
      </div>
    </div>
  );
};

export default ReviewWrite;
