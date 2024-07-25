import { useState, ChangeEvent, useEffect } from "react";
import { IIntro } from "../../../lib/interFace";
import { getClip } from "../../../lib/func";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Star from "../../../Component/Star/Star";

import { rowfont, center, outborder, nanoBtn } from "../../../lib/styles";
import { useBreakPoint } from "../../../CustomHook/BreakPoint";

const serverUrl = process.env.REACT_APP_SERVER_URL;
const imgBase = process.env.REACT_APP_IMG_BASE;

const Intro = ({ intro }: IIntro): JSX.Element => {
  const { isdesktop, ismobile } = useBreakPoint();
  const {
    storeName,
    storePoint,
    storeIntro,
    storeStar,
    storePFImg,
    sellCount,
    loginCheck,
  } = intro;

  const [nameBtn, setNameBtn] = useState<boolean>(false);
  const [nameValue, setNameValue] = useState<string>("");

  const [contentBtn, setContentBtn] = useState<boolean>(false);
  const [contentValue, setContentValue] = useState<string>("");

  const navigate = useNavigate();
  const loca = useLocation();
  const callbackUrl = `${loca.pathname}${loca.search}`;
  const id = new URL(window.location.href).searchParams.get("id");

  console.log(id);
  //func
  const nameBtnOpen = () => {
    setNameBtn(true);
  };

  const imgUploader = (files: File) => {
    const formData: FormData = new FormData();
    formData.append("img", files);

    axios
      .post(`${serverUrl}/imgSave`, formData, {
        withCredentials: true,
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((data) => {
        console.log("imgsave", data.data.url[0]);
        imgChangeToServer(data.data.url[0]);
      })
      .catch(() => {
        console.error("error");
      });
  };

  const imgChangeToServer = async (name: string) => {
    if (id !== null) {
      axios
        .post(
          `${serverUrl}/myStoreProfileImg?id=${id}`,
          { profileimg: name },
          { withCredentials: true }
        )
        .then((data) => {
          console.log("서버로 잘 보냈다", data);
          navigate(`${callbackUrl}`);
        })
        .catch(() => {
          console.error("이미지 서버로 보내기에서 에러");
          navigate(`${callbackUrl}`);
        });
    }
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : undefined;

    if (file) {
      imgUploader(file);
    }
  };

  const storeNameHandler = async () => {
    if (nameValue !== "") {
      const serverCall = serverUrl + "/myStoreNameSet" + loca.search;

      await axios
        .post(serverCall, { name: nameValue }, { withCredentials: true })
        .then(() => {
          navigate(`${callbackUrl}`);
        })
        .catch((error) => {
          navigate(`${callbackUrl}`);
        })
        .finally(() => {
          setNameValue("");
          setNameBtn(false);
        });
    }
  };

  const contentBtnOpen = () => {
    setContentBtn(true);
  };

  const storeContentHandler = async () => {
    if (contentValue !== "") {
      const serverCall = serverUrl + "/myStoreContentSet" + loca.search;

      await axios
        .post(serverCall, { content: contentValue }, { withCredentials: true })
        .then(() => {
          navigate(`${callbackUrl}`);
        })
        .catch((error) => {
          console.log(error);
          navigate(`${callbackUrl}`);
        })
        .finally(() => {
          setContentValue("");
          setContentBtn(false);
        });
    }
  };

  return (
    <div
      className={`${
        isdesktop &&
        "border-2 border-gray-300 w-[95%] h-[350px] p-5 flex justify-between gap-[4%]"
      } ${
        ismobile &&
        "mx-3 border-2 border-gray-300 w-[95%] h-[17rem] p-5 flex justify-between gap-[4%]"
      }`}
    >
      {/*  */}
      <div
        style={{
          backgroundImage: `url('${imgBase}banner.png')`,
        }}
        className={`${center} w-[35%] h-[100%] bg-cover relative`}
      >
        <div className="bg-black bg-opacity-25 w-[100%] h-[100%] absolute"></div>
        {/* 프로파일 이미지 */}

        <div className={`w-[100px] h-[100px] z-10`}>
          <div
            style={{
              backgroundImage:
                storePFImg !== null
                  ? `url(${imgBase}${storePFImg})`
                  : `url(${imgBase}good.png)`,
            }}
            className={`w-[100%] h-[100%] bg-cover rounded-full overflow-hidden`}
          ></div>
          {/* 이름, 별, 평점 */}
          <div>
            {/* 이름 */}
            <div className={`${center} text-white font-bold`}>{storeName}</div>
            {/* 별, 평점 */}
            <Star storeStar={storeStar} />
          </div>
        </div>
        {/*  */}
      </div>

      {/*  */}
      <div className={`w-[65%] h-[100%] p-1 [&>*]:mb-4`}>
        <div className={`flex gap-2 flex-wrap`}>
          <div className="font-bold">{storeName}</div>

          <div className="flex">
            {loginCheck && (
              <button className={`${rowfont} ${nanoBtn}`} onClick={nameBtnOpen}>
                상점명 수정
              </button>
            )}
            {nameBtn && (
              <>
                <input
                  value={nameValue}
                  onInput={({
                    target: { value },
                  }: ChangeEvent<HTMLInputElement>) => {
                    setNameValue(value);
                  }}
                  className={`${outborder} h-[24px]`}
                  type="text"
                />
                <button
                  onClick={storeNameHandler}
                  className={`${rowfont} ${nanoBtn}`}
                >
                  수정하기
                </button>
              </>
            )}
          </div>
          <div className="flex">
            {loginCheck && (
              <>
                <input
                  id="imgupload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <label htmlFor="imgupload" className={`${rowfont} ${nanoBtn}`}>
                  이미지 수정
                </label>
              </>
            )}{" "}
          </div>
        </div>

        <div className={`flex gap-[2%]`}>
          <div className={`${rowfont} text-gray-400`}>
            상품 판매 {sellCount}
          </div>
          {loginCheck && (
            <div className={`${rowfont}`}>보유 포인트:{storePoint}</div>
          )}
        </div>
        <div
          className={`${isdesktop && `${rowfont} h-[65%]`} ${
            ismobile && `${rowfont} h-[40%]`
          }`}
        >
          {storeIntro}
        </div>
        {loginCheck && (
          <div className={`flex`}>
            <button
              onClick={contentBtnOpen}
              className={`${
                isdesktop && `${center} ${rowfont} ${nanoBtn} h-[24px]`
              }
              ${ismobile && " text-[0.6rem] "}`}
            >
              소개글 수정
            </button>
            {contentBtn && (
              <>
                <input
                  value={contentValue}
                  onInput={({
                    target: { value },
                  }: ChangeEvent<HTMLInputElement>) => {
                    setContentValue(value);
                  }}
                  className={`${outborder} h-[24px] ml-2`}
                  type="text"
                />
                <button
                  onClick={storeContentHandler}
                  className={`${isdesktop && `mx-1 ${rowfont} ${nanoBtn}`} ${
                    ismobile &&
                    "m-1 px-1 text-[0.7rem] border border-black rounded  "
                  }`}
                >
                  수정하기
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Intro;
