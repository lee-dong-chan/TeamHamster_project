import { SmallButton } from "../../Component/Button/Button";

import BenKeyWord from "../../Component/List/ManegeList/BenKeyword/Benkeyword";
import { Button } from "../../lib/Button/Button";

import { box, center } from "../../lib/styles";

interface IProps {}

const ManegeBenKeyword = ({}: IProps): JSX.Element => {
  const btn = new Button("추가", "bg-orange-500");
  return (
    <div className={`${box} ${center}`}>
      <div>
        <div className=" h-[30rem] w-[70rem] border border-gray-400 overflow-y-auto">
          <BenKeyWord />
        </div>
        <div className="mt-[10rem] mb-[10rem]  flex justify-between items-center">
          <div className="h-[4rem] ">
            <input
              placeholder="추가할 금지키워드"
              className="p-3 h-[100%] w-[30rem] border border-gray-400 "
            ></input>
          </div>
          <SmallButton btn={btn} />
        </div>
      </div>
    </div>
  );
};

export default ManegeBenKeyword;
