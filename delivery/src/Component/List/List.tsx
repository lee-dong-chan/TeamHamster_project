import { ChangeEvent } from "react";
import Item, { PickCheck, Picklist, delivery } from "./item/Item";

interface IProps {
  liststate: number;
  list1?: PickCheck[];
  list2?: Picklist[];
  list3?: delivery[];
  checkdata?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const List = ({
  checkdata,
  liststate,
  list1,
  list2,
  list3,
}: IProps): JSX.Element => {
  return (
    <div className="h-[20rem] w-[33em] border border-black overflow-y-auto">
      {liststate == 1 && (
        <div>
          <div className="px-4 py-2  flex">
            <div>주문번호</div>
            <div className="flex-1 text-center">픽업주소</div>
            <div className="flex-1 text-center">물류캠프</div>
            <div>선택</div>
          </div>
          {list1?.map((item: PickCheck, idx: number) => {
            return (
              <Item
                key={idx}
                liststate={liststate}
                item1={item}
                checkdata={checkdata}
              />
            );
          })}
        </div>
      )}
      {liststate == 2 && (
        <div>
          <div className="px-4 py-2 flex">
            <div>주문번호</div>
            <div className="flex-1 text-center">배송지</div>
            <div>상태</div>
          </div>
          {list2?.map((item: Picklist, idx: number) => (
            <Item key={idx} liststate={liststate} item2={item} />
          ))}
        </div>
      )}
      {liststate == 3 && (
        <div>
          <div className="px-4 py-2 flex">
            <div>주문번호</div>
            <div className="flex-1 text-center">배송지</div>
            <div className="pe-3">상태</div>
            <div className="pe-3">배송시작</div>
            <div>완료</div>
          </div>
          {list3?.map((item: delivery, idx: number) => (
            <Item
              key={idx}
              liststate={liststate}
              item3={item}
              checkdata={checkdata}
            />
          ))}
        </div>
      )}
    </div>
  );
};
