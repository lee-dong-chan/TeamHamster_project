import { IoMdClose } from "react-icons/io";
import { center } from "../../../lib/styles";

interface IProps {
  ModalOff(): void;
}

const WebModal = ({ ModalOff }: IProps): JSX.Element => {
  return (
    <div className="h-[47rem] w-[50rem] bg-gray-100 overflow-scroll scrollbar-hide ">
      <div className="flex justify-end">
        <div onClick={ModalOff}>
          <IoMdClose size={30} color="gray" />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default WebModal;
