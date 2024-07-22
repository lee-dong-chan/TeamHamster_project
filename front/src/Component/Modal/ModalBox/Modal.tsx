import { IoMdClose } from "react-icons/io";
import Menu from "../Menu/Menu";
import Search from "../Search/Search";
import { useBreakPoint } from "../../../CustomHook/BreakPoint";
import { useRecoilState, useRecoilValue } from "recoil";
import { MapId, Modal } from "../../../Context/Modal";
import Report from "../Report/Report";
import Buy from "../Buy/Buy";
import NMap from "../../Map/NMap";
import { center } from "../../../lib/styles";
import { useMemo } from "react";
import Addadress from "../Addadress/Addadress";

interface IProps {}

const modal = {
  mobilemenu: <Menu />,
  mobilesearch: <Search />,
  report: <Report />,
  buy: <Buy />,
  showMap: (id: number | undefined) => {
    return <NMap id={id} />;
  },
  addadress: <Addadress />,
  // reviewWhite: <ReviewWrite />,
};

const MobileModal = ({}: IProps): JSX.Element => {
  //custom
  const { ismobile, isdesktop } = useBreakPoint();
  const [modalContent, setmodal] = useRecoilState(Modal);

  const mapId = useRecoilValue(MapId);

  //func
  const close = () => {
    setmodal(undefined);
  };

  //hook
  const mapIdValue = useMemo(() => {
    return mapId;
  }, [mapId]);

  return (
    <div
      className={`absolute z-[100] ${
        ismobile && "top-[6rem] h-[50rem] w-[100%]"
      } ${
        isdesktop && "top-[15rem] start-[20%] h-[50rem] w-[60%]"
      } bg-gray-100 overflow-scroll scrollbar-hide`}
    >
      <div className="flex justify-end">
        <div onClick={close}>
          <IoMdClose size={30} color="gray" />
        </div>
      </div>
      {/* 콘텐츠 */}

      <div>
        {modalContent === "mobilemenu" && modal.mobilemenu}
        {modalContent === "mobilesearch" && modal.mobilesearch}
        {modalContent === "report" && modal.report}
        {modalContent === "buy" && modal.buy}
        {modalContent == "addadress" && modal.addadress}
        {/* {modalContent === "reviewWhite" && modal.reviewWhite} */}
        {modalContent === "showMap" && (
          <div className={`${center}`}>{modal.showMap(mapIdValue)}</div>
        )}
      </div>

      {/*  */}
    </div>
  );
};

export default MobileModal;
