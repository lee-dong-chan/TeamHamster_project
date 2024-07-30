import { useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Modalcontent, Modalstate } from "../../../Context/Modal/Modal";

interface IProps {}

const ModalBox = ({}: IProps): JSX.Element => {
  const modalvalue = useRecoilValue(Modalcontent);
  const onoffModal = useSetRecoilState(Modalstate);

  return (
    <div className="border border-black h-[15em] w-[30rem] bg-gray-200 flex flex-col items-center">
      <div className="mt-10 p-5 w-[20rem] h-[8rem] flex items-center justify-center">
        {modalvalue == "delreport" && <div>신고내용이 삭제되었습니다.</div>}
        {modalvalue == "addcate" && <div>카테고리 추가가 완료되었습니다.</div>}
        {modalvalue == "benkeyword" && <div>금지키워드가 추가 되었습니다.</div>}
        {modalvalue == "benuser" && <div>유저 정지가 완료되었습니다.</div>}
        {modalvalue == "releseuser" && <div>유저 정지가 해제되었습니다.</div>}
        {modalvalue == "point" && <div>충전비율이 변경되었습니다.</div>}
        {modalvalue == "delivery" && <div>배송비데이터가 변경되었습니다. </div>}
        {modalvalue == "authority" && <div>유저권한이 변경되었습니다. </div>}
        {modalvalue == "login fale" && <div>로그인 실패. </div>}
      </div>
      <div
        onClick={() => {
          onoffModal(false);
          if (modalvalue == "addcate") {
            window.location.reload();
          }
        }}
        className="border border-black px-4 py-2 rounded bg-orange-500 text-white"
      >
        확인
      </div>
    </div>
  );
};

export default ModalBox;
