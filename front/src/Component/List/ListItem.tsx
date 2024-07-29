import { Link } from "react-router-dom";
import { List as ListData } from "../../lib/list";
import { useBreakPoint } from "../../CustomHook/BreakPoint";
import { center } from "../../lib/styles";

export interface IList {
  id: number;
  title: string;
  img: string;
  price: number;
  createdAt: number;
}

interface IProps {
  item: IList;
}

const Item = ({ item }: IProps): JSX.Element => {
  const { isdesktop, ismobile } = useBreakPoint();
  return (
    <Link to={`/product/${item.id}`}>
      <div
        className={`${isdesktop && "mb-5 max-w-[15rem] border"} ${
          ismobile && "mb-5 max-w-[12rem] border"
        }`}
      >
        <div className={`${center}`}>
          <img className="w-[100%] h-[190px] flex" src={`${item.img}`}></img>
        </div>
        <div className=" border-t">
          <div className="p-3 text-[1.1rem]">{item.title}</div>
          <div className="p-3 flex justify-between items-center">
            <div>
              <span className="text-[1.2rem] font-bold">{item.price}</span> 원
            </div>
            <div className="text-[0.8rem] text-gray-500">
              {item.createdAt}일 전
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Item;
