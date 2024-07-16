import { IoMdClose } from "react-icons/io";
import Menu from "../Menu/Menu";
interface IProps {
  ModalOff(): void;
  ModalContent: string;
}

const MobileModal = ({ ModalOff, ModalContent }: IProps): JSX.Element => {
  return (
    <div className="h-[40rem] bg-gray-100 overflow-scroll scrollbar-hide">
      <div className="flex justify-end">
        <div onClick={ModalOff}>
          <IoMdClose size={30} color="gray" />
        </div>
      </div>
      <div>
        {ModalContent == "menu" && <Menu ModalOff={ModalOff} />}
        {ModalContent == "search"}
      </div>
    </div>
  );
};

export default MobileModal;
