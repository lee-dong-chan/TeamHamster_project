import { useRecoilState, useSetRecoilState } from "recoil";
import ButtonComp, { LargeButton } from "../../Component/Button/Button";
import ProductInfo from "../../Component/Product/Product";
import { useBreakPoint } from "../../CustomHook/BreakPoint";
import { Button } from "../../lib/Button/Button";
import { box, center } from "../../lib/styles";
import { Modal, Modalproduct } from "../../Context/Modal";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

interface IProps {}

const Product = ({}: IProps): JSX.Element => {
  const { isdesktop, ismobile } = useBreakPoint();
  const { id } = useParams();
  const btn = new Button("구매하기", "bg-orange-200");
  const ModalState = useSetRecoilState(Modal);
  const Modalproductitem = useSetRecoilState(Modalproduct);
  const report = () => {
    ModalState("report");
  };
  const buy = () => {
    ModalState("buy");
  };

  useEffect(() => {
    Modalproductitem(id);
  }, []);
  return (
    <div>
      <div className={`${box} ${center} relative`}>
        <div>
          <ProductInfo />
          <div className={`pt-5 pb-3`}>
            {isdesktop && (
              <div
                onClick={report}
                className="p-2 flex justify-end text-gray-400"
              >
                신고하기
              </div>
            )}
            {ismobile && (
              <div
                onClick={report}
                className="p-2 flex justify-end text-gray-400"
              >
                신고하기
              </div>
            )}

            {isdesktop && (
              <div onClick={buy}>
                <LargeButton btn={btn} />
              </div>
            )}
            {ismobile && (
              <div onClick={buy}>
                <ButtonComp width="w-[30rem]" btn={btn} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
