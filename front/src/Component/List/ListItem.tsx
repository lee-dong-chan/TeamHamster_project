import { Link } from "react-router-dom";
import { List as ListData } from "../../lib/list";
import { useBreakPoint } from "../../CustomHook/BreakPoint";
import { IListData } from "../../App";

export interface IItem {
  getId: () => number;
  getTite: () => string;
  getImg: () => string;
  getPrice: () => number;
  getCreatedAt: () => number;
}

interface IProps {
  item: ListData;
}

const Item = ({ item }: IProps): JSX.Element => {
  const { isdesktop, ismobile } = useBreakPoint();
  return (
    <Link to={`/product/${item.getId()}`}>
      <div
        className={`${isdesktop && "mb-5 max-w-[15rem] border"} ${
          ismobile && "mb-5 max-w-[12rem] border"
        }`}
      >
        <div>
          <img src={`${item.getImg()}`}></img>
        </div>
        <div className=" border-t">
          <div className="p-3 text-[1.1rem]">{item.getTite()}</div>
          <div className="p-3 flex justify-between items-center">
            <div>
              <span className="text-[1.2rem] font-bold">{item.getPrice()}</span> 원
            </div>
            <div className="text-[0.8rem] text-gray-500">{item.getCreatedAt()}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Item;
