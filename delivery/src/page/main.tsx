import { center, mobilebox } from "../lib/styles";
import { IoRocketSharp } from "react-icons/io5";
import { GiFinishLine } from "react-icons/gi";
import { LuScanLine } from "react-icons/lu";
import { Link } from "react-router-dom";
import { MdAddShoppingCart } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaClipboardList } from "react-icons/fa";

interface IProps {
  start(): void;
  end(): void;
}

const Main = ({ start, end }: IProps): JSX.Element => {
  return (
    <div className={`${mobilebox}`}>
      <div className=" p-3 flex grid grid-cols-2">
        <div className="flex flex-col items-center">
          <div className={`h-[10rem] w-[10rem] border`} onClick={start}>
            <IoRocketSharp className="h-[100%] w-[100%]" color="gray" />
          </div>
          <div className="py-2 text-[1.2rem] text-gray-500">업무시작</div>
        </div>
        <div className="flex flex-col items-center">
          <div className={`h-[10rem] w-[10rem] border`} onClick={end}>
            <GiFinishLine className="h-[100%] w-[100%]" color="gray" />
          </div>
          <div className="py-2 text-[1.2rem] text-gray-500">업무종료</div>
        </div>
        <div className="flex flex-col items-center">
          <Link to={"/pickupscan"}>
            <div className={`h-[10rem] w-[10rem] border`}>
              <LuScanLine className="h-[100%] w-[100%]" color="gray" />
            </div>
          </Link>
          <div className="py-2 text-[1.2rem] text-gray-500">픽업상품 스캔</div>
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
