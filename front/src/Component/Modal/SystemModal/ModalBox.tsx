import { useRecoilValue, useSetRecoilState } from "recoil";
import { Modalcontent, Modalstate } from "../../../Context/SystemModal/Modal";

interface IProps {}

const ModalBox = ({}: IProps): JSX.Element => {
  const modalvalue = useRecoilValue(Modalcontent);
  const onoffModal = useSetRecoilState(Modalstate);

  return (
    <div className="border border-black h-[15em] w-[30rem] bg-gray-200 flex flex-col items-center">
      <div className="mt-10 p-5 w-[20rem] h-[8rem] flex items-center justify-center">
        {modalvalue == "not login" && <div>로그인 실패. </div>}
        {modalvalue == "login" && <div>로그인 성공. </div>}
        {modalvalue == "logout" && <div>로그아웃 성공. </div>}
        {modalvalue == "not logout" && <div>로그인 성공. </div>}
        {modalvalue == "oncharge" && <div>포인트 충전이 완료되었습니다. </div>}
        {modalvalue == "failcharge" && (
          <div>포인트 충전에 실패하엿습니다. </div>
        )}
        {modalvalue == "chargeerror" && (
          <div>충전 요청 중 오류가 발생하엿습니다. </div>
        )}
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
