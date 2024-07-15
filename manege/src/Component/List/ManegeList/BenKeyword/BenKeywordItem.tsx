import Button from "../../../../lib/Button/Button";
import TinyButton from "../../../Button/TinyButton";

interface IProps {}

const Item = ({}: IProps): JSX.Element => {
  const deletebtn = new Button("삭제", "bg-red-200");
  return (
    <div className="px-5 py-2 flex items-center ">
      <span className="mx-2">1</span>
      <span className="ps-3 flex-1 truncate ">수면제</span>
      <div>
        <TinyButton btn={deletebtn} />
      </div>
    </div>
  );
};

export default Item;
