import { IoMdClose } from "react-icons/io";
import Menu from "../Menu/Menu";
import Search from "../Search/Search";
import { useBreakPoint } from "../../../CustomHook/BreakPoint";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Modal } from "../../../Context/Modal";
import Report from "../Report/Report";
import Buy from "../Buy/Buy";

interface IProps {}

const modal = {
  mobilemenu: <Menu />,
  mobilesearch: <Search />,
  report: <Report />,
  buy: <Buy />,
};

const MobileModal = ({}: IProps): JSX.Element => {
  const { ismobile, isdesktop } = useBreakPoint();
  const modalContent = useRecoilState(Modal);
  const setmodal = useSetRecoilState(Modal);
  const close = () => {
    setmodal(undefined);
  };

  console.log(modalContent);
  return (
    <div
      className={`absolute ${ismobile && "top-[6rem] h-[50rem]   w-[100%]"} ${
        isdesktop && "top-[15rem] start-[20%] h-[50rem]  w-[60%]"
      }   bg-gray-100 overflow-scroll scrollbar-hide`}
    >
      <div className="flex justify-end">
        <div onClick={close}>
          <IoMdClose size={30} color="gray" />
        </div>
      </div>
      <div>
        {modalContent[0] == "mobilemenu" && modal.mobilemenu}
        {modalContent[0] == "mobilesearch" && modal.mobilesearch}
        {modalContent[0] == "report" && modal.report}
        {modalContent[0] == "buy" && modal.buy}
      </div>
    </div>
  );
};

export default MobileModal;
