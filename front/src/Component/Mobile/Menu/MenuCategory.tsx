import CategoryItem from "./CategoryItem";
import { useCallback, useMemo, useState } from "react";

interface IProps {
  ModalOff(): void;
}

const MenuCategory = ({ ModalOff }: IProps): JSX.Element => {
  const [cateCount, setCateCount] = useState(0);

  const setCatePage = useCallback((num: number) => {
    setCateCount(num);
  }, []);
  const test = [
    { id: 1, name: "자동차" },
    { id: 2, name: "자전거" },
    { id: 3, name: "오징어" },
    { id: 4, name: "전자제품" },
    { id: 5, name: "도서" },
    { id: 6, name: "디지털" },
    { id: 7, name: "금속" },
    { id: 8, name: "도구" },
    { id: 9, name: "도구" },
    { id: 10, name: "오징어" },
    { id: 11, name: "오징어" },
    { id: 12, name: "오징어" },
    { id: 13, name: "오징어" },
    { id: 14, name: "오징어" },
    { id: 15, name: "오징어" },
    { id: 16, name: "오징어" },
    { id: 17, name: "오징어" },
    { id: 18, name: "오징어" },
  ];

  const btns = useMemo(() => {
    const temp = [];
    for (let i = 0; i < test.length / 9; i++) temp.push(i);
    return temp;
  }, [test]);

  return (
    <div>
      <div className="w-[30rem] overflow-hidden">
        <div className={`px-8 py-10 grid grid-cols-3 gap-8 `}>
          {test.slice(cateCount * 9, (cateCount + 1) * 9).map((item, idx) => (
            <CategoryItem item={item} ModalOff={ModalOff} />
          ))}
        </div>
      </div>
      <div className={`center`}>
        <div className="flex gap-5">
          {btns.map((_, idx: number) => (
            <div
              className={`h-4 ${
                idx == cateCount
                  ? "w-7 rounded bg-orange-600"
                  : "w-4 rounded bg-orange-400"
              }`}
              onClick={() => {
                setCatePage(idx);
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuCategory;
