import SmallButton from "../../Component/Button/smallButton";
import Button from "../../lib/Button/Button";

interface IProps {}

const ManegeDeliveryTip = ({}: IProps): JSX.Element => {
  const btn = new Button("확인", "bg-orange-500");
  return (
    <div className="Box">
      <div className="Center flex-col">
        <div className="mt-[5rem] mb-[10rem] w-[50rem] flex justify-between items-center">
          <div className="h-[4rem] ">
            <input
              placeholder="배송비 액수"
              className="p-3 h-[100%] w-[30rem] border border-gray-400 "
            ></input>
          </div>
          <SmallButton btn={btn} />
        </div>
        <div className="pb-20 flex w-[45rem] text-[2rem] font-bold gap-10">
          <div>현재 배송비: </div>
          <div>
            <span className="text-orange-500"> 2500</span>원
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManegeDeliveryTip;
