import { box, center } from "../../lib/styles";
import { LargeButton } from "../../Component/Button/Button";

import ManegeCategoryList from "../../Component/Category/ManegeCategory/ManegeCategory";
import { Button } from "../../lib/Button/Button";

interface IProps {}

const ManegeCategory = ({}: IProps): JSX.Element => {
  const btn = new Button("카테고리 생성", "bg-orange-500");
  return (
    <div className={`$${box} pb-10`}>
      <div className={`${center}`}>
        <ManegeCategoryList />
      </div>
      <div className={`${center}`}>
        <div className="mt-[10rem] mb-[10rem] w-[60rem]  flex justify-between items-center">
          <div className="h-[4rem] ">
            <input
              placeholder="상위 카테고리"
              className="p-3 h-[100%] w-[25rem] border border-gray-400 "
            ></input>
          </div>
          <div className="h-[4rem] ">
            <input
              placeholder="생성할 카테고리"
              className="p-3 h-[100%] w-[25rem] border border-gray-400 "
            ></input>
          </div>
        </div>
      </div>
      <div className={`${center}`}>
        <LargeButton btn={btn} />
      </div>
    </div>
  );
};

export default ManegeCategory;
