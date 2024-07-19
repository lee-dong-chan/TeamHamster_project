import { IoMdClose } from "react-icons/io";
import Menu from "../Menu/Menu";
import Search from "../Search/Search";
interface IProps {
  ModalOff(): void;
  ModalContent: string | undefined;
}

const MobileModal = ({ ModalOff, ModalContent }: IProps): JSX.Element => {
  return (
    <div className="h-[47rem] bg-gray-100 overflow-scroll scrollbar-hide">
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
