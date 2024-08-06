import { useRecoilValue, useSetRecoilState } from "recoil";
import { Modalcontent, Modalstate } from "../../../Context/SystemModal/Modal";

const ModalBox = (): JSX.Element => {
  const modalvalue = useRecoilValue(Modalcontent);
  const onoffModal = useSetRecoilState(Modalstate);

  return (
    <div className="border border-black h-[15em] w-[30rem] bg-gray-200 flex flex-col items-center">
      <div className="mt-10 p-5 w-[20rem] h-[8rem] flex items-center justify-center">
        {modalvalue === "not login" && <div>로그인 실패. </div>}
        {modalvalue === "login" && <div>로그인 성공. </div>}
        {modalvalue === "logout" && <div>로그아웃 성공. </div>}
        {modalvalue === "not logout" && <div>로그아웃 실패. </div>}
        {modalvalue === "oncharge" && <div>포인트 충전이 완료되었습니다. </div>}
        {modalvalue === "failcharge" && (
          <div>포인트 충전에 실패하엿습니다. </div>
        )}
        {modalvalue === "chargeerror" && (
          <div>충전 요청 중 오류가 발생하엿습니다. </div>
        )}
        {modalvalue === "findpwfalil" && (
          <div>입력된정보가 일치하는 대상이 없습니다.</div>
        )}
        {modalvalue === "changesucsess" && <div>비밀번호 변경 성공.</div>}
        {modalvalue === "changefail" && <div>비밀번호 변경 실패.</div>}
        {modalvalue === "sucsessid" && <div>아이디찾기 성공.</div>}

        {modalvalue === "notdata" && <div>입력된 정보를 확인해 주세요.</div>}
        {modalvalue === "sucessproduct" && <div>상품등록성공</div>}
        {modalvalue === "sucsesspurchase" && <div>상품구매완료</div>}
        {modalvalue === "failpurchase" && (
          <div className="text-center">
            상품을 구매하지 못했습니다.
            <br /> 포인트 보유여부를 확인해주세요
          </div>
        )}
        {modalvalue === "checkpurchase" && <div>구매가 확정되었습니다.</div>}

        {modalvalue === "sucsessreview" && (
          <div>리뷰작성을 완료하엿습니다.</div>
        )}
        {modalvalue === "checkfail" && <div>구매확정 실패.</div>}
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
