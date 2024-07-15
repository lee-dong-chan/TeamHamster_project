import Button from "../../../../lib/Button/Button";
import TinyButton from "../../../Button/TinyButton";

interface IProps {}

const Item = ({}: IProps): JSX.Element => {
  const productbtn = new Button("상품", "bg-blue-200");
  const deletebtn = new Button("삭제", "bg-red-200");
  return (
    <div className="px-5 py-2 flex items-center ">
      <span className="mx-2">1</span>
      <span className="ps-3 flex-1 truncate ">사유</span>
      <span className="px-3 w-[5rem] truncate">피신고유저dasdasdsa</span>
      <TinyButton btn={productbtn} />
      <TinyButton btn={deletebtn} />
    </div>
  );
};

export default Item;
