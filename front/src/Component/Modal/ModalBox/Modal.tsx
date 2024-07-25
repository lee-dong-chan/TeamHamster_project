import { IoMdClose } from "react-icons/io";
import Menu from "../Menu/Menu";
import Search from "../Search/Search";
import { useBreakPoint } from "../../../CustomHook/BreakPoint";
import { useRecoilState, useRecoilValue } from "recoil";
import { MapId, ReviewId, Modal, ImgUrl } from "../../../Context/Modal";
import Report from "../Report/Report";
import Buy from "../Buy/Buy";
import NMap from "../../Map/NMap";
import { center } from "../../../lib/styles";
import { useMemo } from "react";
import Addadress from "../Addadress/Addadress";
import ReviewWrite from "../ReviewWrite/ReviewWrite";
import { IUserDatas } from "../../../lib/interFace";

interface IProps {
  setUserLogin: React.Dispatch<React.SetStateAction<boolean>>;
  userlogin: boolean;
  userDatas: IUserDatas;
  userDataCheck: () => void;
}

const MobileModal = ({
  setUserLogin,
  userlogin,
  userDatas,
  userDataCheck,
}: IProps): JSX.Element => {
  //custom

  const modal = {
    mobilemenu: (
      <Menu
        setUserLogin={setUserLogin}
        userlogin={userlogin}
        userDatas={userDatas}
        userDataCheck={userDataCheck}
      />
    ),
    mobilesearch: <Search />,
    report: <Report />,
    buy: <Buy />,
    showMap: (id: number | undefined) => {
      return <NMap id={id} />;
    },
    reviewWhite: (id: number | undefined, img: string | undefined) => {
      return <ReviewWrite id={id} img={img} />;
    },
    addadress: <Addadress />,
  };

  const { ismobile, isdesktop } = useBreakPoint();
  const [modalContent, setmodal] = useRecoilState(Modal);

  const mapId = useRecoilValue(MapId);
  const reviewId = useRecoilValue(ReviewId);
  const imgUrl = useRecoilValue(ImgUrl);

  //func
  const close = () => {
    setmodal(undefined);
  };

  //hook
  const mapIdValue = useMemo(() => {
    return mapId;
  }, [mapId]);

  const reviewIdValue = useMemo(() => {
    return reviewId;
  }, [reviewId]);

  const imgUrlValue = useMemo(() => {
    return imgUrl;
  }, [imgUrl]);

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
        {modalContent === "addadress" && modal.addadress}
        {modalContent === "reviewWhite" && (
          <div>{modal.reviewWhite(reviewIdValue, imgUrlValue)}</div>
        )}
        {modalContent === "showMap" && (
          <div className={`${center}`}>{modal.showMap(mapIdValue)}</div>
        )}
      </div>

      {/*  */}
    </div>
  );
};

export default MobileModal;
