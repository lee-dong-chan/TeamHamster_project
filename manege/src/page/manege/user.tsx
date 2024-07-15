import SmallButton from "../../Component/Button/smallButton";
import Ben from "../../Component/List/ManegeList/User/Ben/Ben";
import ReportUser from "../../Component/List/ManegeList/User/ReportUser/ReportUser";
import Button from "../../lib/Button/Button";

interface IProps {}

const ManegeUser = ({}: IProps): JSX.Element => {
  const btn = new Button("검색", "bg-orange-500");
  return (
    <div className="Box Center">
      <div>
        <div className=" h-[20rem] w-[70rem] border border-gray-400 overflow-y-auto">
          <ReportUser />
        </div>
        <div className="mt-20 h-[20rem] w-[70rem] border border-gray-400 overflow-y-auto">
          <Ben />
        </div>
        <div className="mt-[10rem] mb-[10rem]  flex justify-between items-center">
          <div className="h-[4rem] ">
            <input
              placeholder="정지유저 검색"
              className="p-3 h-[100%] w-[30rem] border border-gray-400 "
            ></input>
          </div>
          <SmallButton btn={btn} />
        </div>
      </div>
    </div>
  );
};

export default ManegeUser;
