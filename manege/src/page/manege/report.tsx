import { box, center } from "../../lib/styles";
import { SmallButton } from "../../Component/Button/Button";

import Report from "../../Component/List/ManegeList/Report/Report";
import { Button } from "../../lib/Button/Button";

interface IProps {}

const ManegeReport = ({}: IProps): JSX.Element => {
  const btn = new Button("검색", "bg-orange-500");
  return (
    <div className={`${box} ${center}`}>
      <div>
        <div className=" h-[30rem] w-[70rem] border border-gray-400 overflow-y-scroll">
          <Report />
        </div>
        <div className="mt-[10rem] mb-[10rem]  flex justify-between items-center">
          <div className="h-[4rem] ">
            <input
              placeholder="피신고유저 검색"
              className="p-3 h-[100%] w-[30rem] border border-gray-400 "
            ></input>
          </div>
          <SmallButton btn={btn} />
        </div>
      </div>
    </div>
  );
};

export default ManegeReport;
