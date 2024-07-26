import { ChangeEvent, useCallback, useEffect, useState } from "react";
import DaumApi from "./Daumpostcode";
import ButtonComp from "../../Button/Button";
import { Button } from "../../../lib/Button/Button";
import { Modal } from "../../../Context/Modal";
import { useSetRecoilState } from "recoil";
import axios from "axios";

interface IProps {}

const Addaddress = ({}: IProps): JSX.Element => {
  const nameReg = /^[가-힣]{2,4}$/;
  const phoneReg = /^\d{2,3}-\d{3,4}-\d{4}$/;

  const modalstate = useSetRecoilState(Modal);

  const btn = new Button("추가하기", "bg-orange-200");

  const [api, setApi] = useState(false);
  const [address, setaddress] = useState({
    code: "",
    full: "",
  });
  const [etcaddress, setetcadress] = useState<string>("");

  const [name, setName] = useState<string>("");
  //폰 넘버
  const [phoneNum, setPhoneNum] = useState<string>("");

  const serverUrl = process.env.REACT_APP_SERVER_URL;

  interface IAdressData {
    etcaddress: string;
    address: { code: string; full: string };
    name: string;
    phoneNum: string;
  }
  //click
  const addAdressFunc = async (data: IAdressData) => {
    const { etcaddress, address, name, phoneNum } = data;

    await axios
      .post(
        `${serverUrl}/addaddress`,
        {
          name: name,
          address: address.full,
          detailaddress: etcaddress,
          mobile: phoneNum,
          // zoneCode: address.code,
        },
        { withCredentials: true }
      )
      .then((data) => {
        console.log(data);
        modalstate(undefined);
      })
      .catch((err) => {
        console.error("err:", err);
      });
  };

  //상세주소 셋
  const inputadress = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setetcadress(e.target.value);
  }, []);

  const setNameFunc = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const setPhoneNumFunc = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNum(e.target.value);
  };

  const openApi = () => {
    setApi(true);
  };
  useEffect(() => {
    setApi(false);
  }, [address]);

  return (
    <div>
      {!api ? (
        <div className="">
          <div className="text-[1.3rem] text-center">주소추가</div>
          <div className="mt-10 px-10">
            <div className="flex items-center">
              <div>우편번호:</div>
              <input
                className="m-4 p-2 w-[10rem] h-[3rem] flex items-center bg-white border "
                type="text"
                value={address.code}
              ></input>
              <div
                onClick={openApi}
                className="p-2 border rounded bg-orange-200"
              >
                주소검색
              </div>
            </div>
            <div className="flex items-center">
              <div>기본주소:</div>
              <input
                className="m-4 p-2 flex-1 max-w-[30rem] h-[3rem] flex items-center bg-white border "
                type="text"
                value={address.full}
              ></input>
            </div>
            <div className="flex items-center">
              <div>상세주소:</div>
              <input
                className="m-4 p-2 flex-1 max-w-[30rem] h-[3rem] flex items-center bg-white border "
                value={etcaddress}
                onInput={inputadress}
              ></input>
            </div>

            <div className="flex items-center flex-wrap">
              <div>이름:</div>
              <input
                className="m-4 p-2 flex-1 max-w-[30rem] h-[3rem] flex items-center bg-white border "
                value={name}
                onInput={setNameFunc}
              ></input>
            </div>
            {!nameReg.test(name) && (
              <div className="text-red-400">
                이름은 2~4글자 사이로 입력하세요
              </div>
            )}

            <div className="flex items-center">
              <div>전화번호:</div>
              <input
                className="m-4 p-2 flex-1 max-w-[30rem] h-[3rem] flex items-center bg-white border "
                value={phoneNum}
                onInput={setPhoneNumFunc}
              ></input>
            </div>
            {!phoneReg.test(phoneNum) && (
              <div className="text-red-400">
                입력가능한 번호의 예 : 010-1234-5678
              </div>
            )}

            <div className="my-5 flex items-center">
              <div>추가할 주소: </div>
              <div className="px-2 text-[1.3rem] text-orange-500">
                {address.full + " " + etcaddress}
              </div>
            </div>
            <div className="py-[1rem] text-[1.3rem]">
              이 주소를 추가하시겠습니까?
            </div>
          </div>
          <div
            onClick={() => {
              if (
                etcaddress !== "" &&
                address.code !== "" &&
                address.full !== "" &&
                phoneReg.test(phoneNum) &&
                nameReg.test(name)
              ) {
                addAdressFunc({
                  etcaddress: etcaddress,
                  address: address,
                  name: name,
                  phoneNum: phoneNum,
                });
              }
            }}
            className="flex justify-center"
          >
            <ButtonComp btn={btn} />
          </div>
        </div>
      ) : (
        <div>
          <DaumApi setaddress={setaddress} />
        </div>
      )}
    </div>
  );
};
export default Addaddress;
