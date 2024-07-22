import { ChangeEvent, useCallback, useEffect, useState } from "react";
import DaumApi from "./Daumpostcode";
import ButtonComp from "../../Button/Button";
import { Button } from "../../../lib/Button/Button";

interface IProps {}

const Addaddress = ({}: IProps): JSX.Element => {
  const btn = new Button("추가하기", "bg-orange-200");
  const [api, setApi] = useState(false);
  const [address, setaddress] = useState({
    code: "",
    full: "",
  });
  const [etcaddress, setetcadress] = useState<string>("");
  const inputadress = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setetcadress(e.target.value);
  }, []);
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
            <div className="my-5 flex items-center">
              <div>추가할 주소: </div>
              <div className="px-2 text-[1.3rem] text-orange-500">
                {address.full + " " + etcaddress}
              </div>
            </div>
            <div className="py-[6rem] text-[1.3rem]">
              이 주소를 추가하시겠습니까?
            </div>
          </div>
          <div className="flex justify-center">
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
