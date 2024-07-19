import ButtonComp, { LargeButton } from "../../Component/Button/Button";
import ProductInfo from "../../Component/Product/Product";
import { useBreakPoint } from "../../CustomHook/BreakPoint";
import { Button } from "../../lib/Button/Button";
import { box, center } from "../../lib/styles";

interface IProps {
  buymodal(): void;
  reportmodal(): void;
  mobilereport(): void;
  mobilebuy(): void;
}

const Product = ({
  buymodal,
  reportmodal,
  mobilereport,
  mobilebuy,
}: IProps): JSX.Element => {
  const { isdesktop, ismobile } = useBreakPoint();
  const btn = new Button("구매하기", "bg-orange-200");
  return (
    <div>
      <div className={`${box} ${center} relative`}>
        <div>
          <ProductInfo />
          <div className={`pt-5 pb-3`}>
            {isdesktop && (
              <div
                onClick={reportmodal}
                className="p-2 flex justify-end text-gray-400"
              >
                신고하기
              </div>
            )}
            {ismobile && (
              <div
                onClick={mobilereport}
                className="p-2 flex justify-end text-gray-400"
              >
                신고하기
              </div>
            )}

            {isdesktop && (
              <div onClick={buymodal}>
                <LargeButton btn={btn} />
              </div>
            )}
            {ismobile && (
              <div onClick={mobilebuy}>
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
