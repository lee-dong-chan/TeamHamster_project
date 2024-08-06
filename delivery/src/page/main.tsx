import { mobilebox } from "../lib/styles";
import { IoRocketSharp } from "react-icons/io5";
import { GiFinishLine } from "react-icons/gi";

import { Link } from "react-router-dom";
import { MdAddShoppingCart } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaClipboardList, FaTag } from "react-icons/fa";
import { useSetRecoilState } from "recoil";
import { Modalcontent, Modalstate } from "../Context/Modal/Modal";

interface IProps {
  start(): void;
  end(): void;
  workstate: boolean;
}

const Main = ({ start, end, workstate }: IProps): JSX.Element => {
  const setsystemonoff = useSetRecoilState(Modalstate);
  const setModalcontent = useSetRecoilState(Modalcontent);
  return (
    <div className={`${mobilebox} h-[41rem]`}>
      <div className=" p-3 grid grid-cols-2">
        <div className="flex flex-col items-center">
          <div
            className={`h-[10rem] w-[10rem] border`}
            onClick={() => {
              if (!workstate) {
                start();
                setsystemonoff(true);
                setModalcontent("workstart");
              }
            }}
          >
            <IoRocketSharp className="h-[100%] w-[100%]" color="gray" />
          </div>
          <div className="py-2 text-[1.2rem] text-gray-500">업무시작</div>
        </div>
        <div className="flex flex-col items-center">
          <div
            className={`h-[10rem] w-[10rem] border`}
            onClick={() => {
              if (workstate) {
                end();
                setsystemonoff(true);
                setModalcontent("workend");
              }
            }}
          >
            <GiFinishLine className="h-[100%] w-[100%]" color="gray" />
          </div>
          <div className="py-2 text-[1.2rem] text-gray-500">업무종료</div>
        </div>
        <div className="flex flex-col items-center">
          <Link to={"/pickuplist"}>
            <div
              className={`h-[10rem] w-[10rem] border flex item-center justify-center`}
            >
              <FaTag className="py-3 h-[80%] w-[80%]" color="gray" />
            </div>
          </Link>
          <div className="py-2 text-[1.2rem] text-gray-500">픽업목록</div>
        </div>
        <div className="flex flex-col items-center">
          <Link to={"/pickupcheck"}>
            <div className={`h-[10rem] w-[10rem] border`}>
              <MdAddShoppingCart className="h-[100%] w-[100%]" color="gray" />
            </div>
          </Link>
          <div className="py-2 text-[1.2rem] text-gray-500">픽업상품 선택</div>
        </div>
        <div className="flex flex-col items-center">
          <Link to={"/selectcamp"}>
            <div className={`h-[10rem] w-[10rem] border`}>
              <CiDeliveryTruck className="h-[100%] w-[100%]" color="gray" />
            </div>
          </Link>
          <div className="py-2 text-[1.2rem] text-gray-500">배송캠프 선택</div>
        </div>
        <div className="flex flex-col items-center">
          <Link to={"/mypage"}>
            <div className={`h-[10rem] w-[10rem] border`}>
              <FaClipboardList className="h-[100%] w-[100%]" color="gray" />
            </div>
          </Link>
          <div className="py-2 text-[1.2rem] text-gray-500">업무기록</div>
        </div>
      </div>
    </div>
  );
};

export default Main;
