import { useRecoilValue, useSetRecoilState } from "recoil";
import { Modalcontent, Modalstate } from "../../Context/Modal/Modal";

const ModalBox = (): JSX.Element => {
  const modalvalue = useRecoilValue(Modalcontent);
  const onoffModal = useSetRecoilState(Modalstate);

  return (
    <div className="border border-black h-[15em] w-[30rem] bg-gray-200 flex flex-col items-center">
      <div className="mt-10 p-5 w-[20rem] h-[8rem] flex items-center justify-center">
        {modalvalue === "not login" && <div>로그인 실패. </div>}
        {modalvalue === "workstart" && <div>업무를 시작합니다. </div>}
        {modalvalue === "workend" && <div>업무가 종료되었습니다. </div>}
        {modalvalue === "logout" && <div>로그아웃 완료. </div>}
        {modalvalue === "logoutfail" && <div>로그아웃 실패. </div>}
        {modalvalue === "sucesspick" && <div>상품픽업 목록 추가완료. </div>}
        {modalvalue === "failpick" && (
          <div>상품을 픽업목록에 추가하지 못했습니다.</div>
        )}
        {modalvalue === "completepick" && <div>상품픽업이 완료되었습니다.</div>}
        {modalvalue === "failpickscan" && (
          <div>상품을 픽업하지 못했습니다.</div>
        )}
        {modalvalue === "completedelivery" && (
          <div>상품배송을 완료하엿습니다.</div>
        )}
        {modalvalue === "falideliveryscan" && <div>배송완료 스캔 실패.</div>}

        {modalvalue === "setcamp" && <div>캠프가 배정되었습니다.</div>}
      </div>
      <div
        onClick={() => {
          onoffModal(false);
        }}
        className="border border-black px-4 py-2 rounded bg-orange-200 text-white"
      >
        확인
      </div>
    </div>
  );
};

export default ModalBox;
