import LargeButton from "../../Component/Button/LargeButton";
import ManegeCategoryList from "../../Component/Category/ManegeCategory/ManegeCategory";
import Button from "../../lib/Button/Button";

interface IProps {}

const ManegeCategory = ({}: IProps): JSX.Element => {
  const btn = new Button("카테고리 생성", "bg-orange-500");
  return (
    <div className="pb-10 Box">
      <div className="Center">
        <ManegeCategoryList />
      </div>
      <div className="Center">
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
      <div className="Center">
        <LargeButton btn={btn} />
      </div>
    </div>
  );
};

export default ManegeCategory;
