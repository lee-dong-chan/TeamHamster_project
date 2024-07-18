import { center } from "../../lib/styles";

interface IProps {}

const TodayLog = ({}: IProps): JSX.Element => {
  return (
    <div>
      <div className="pb-5 flex justify-evenly">
        <div className="text-center">
          <div className="py-2 font-bold">배송완료건</div>
          <div
            className={`${center} h-[13rem] w-[13rem] border text-[3rem] text-blue-300`}
          >
            15
          </div>
        </div>
        <div className="text-center ">
          <div className="py-2 font-bold">픽업완료건</div>
          <div
            className={`${center} h-[13rem] w-[13rem] border text-[3rem] text-blue-300`}
          >
            12
          </div>
        </div>
      </div>
      <div className="py-5 flex justify-evenly items-center h-[4rem] border">
        <div className="text-[1.2rem] font-bold">
          <span className="pe-2">배송대기:</span>
          <span className="text-blue-200">3</span>건
        </div>
        <div className="text-[1.2rem] font-bold">
          <span className="pe-2">픽업대기:</span>
          <span className="text-blue-200">2</span>건
        </div>
      </div>
    </div>
  );
};

export default TodayLog;
