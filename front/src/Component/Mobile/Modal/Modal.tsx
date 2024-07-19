import { IoMdClose } from "react-icons/io";
import Menu from "../Menu/Menu";
import Search from "../Search/Search";
import { useBreakPoint } from "../../../CustomHook/BreakPoint";
interface IProps {
  ModalOff(): void;
  ModalContent: string | undefined;
}

const MobileModal = ({ ModalOff, ModalContent }: IProps): JSX.Element => {
  const { ismobile, isdesktop } = useBreakPoint();
  return (
    <div
      className={`absolute ${ismobile && "top-[6rem] h-[50rem]   w-[100%]"} ${
        isdesktop && "top-[15rem] start-[20%] h-[50rem]  w-[60%]"
      }   bg-gray-100 overflow-scroll scrollbar-hide`}
    >
      <div className="flex justify-end">
        <div onClick={ModalOff}>
          <IoMdClose size={30} color="gray" />
        </div>
      </div>
      <div>
        {ModalContent == "menu" && <Menu ModalOff={ModalOff} />}
        {ModalContent == "search" && <Search ModalOff={ModalOff} />}
      </div>
    </div>
  );
};

export default MobileModal;
