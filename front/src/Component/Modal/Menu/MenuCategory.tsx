import axios from "axios";
import { center } from "../../../lib/styles";
import CategoryItem, { ICate } from "./CategoryItem";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";

interface IProps {}

const MenuCategory = ({}: IProps): JSX.Element => {
  const [cateCount, setCateCount] = useState(0);

  const setCatePage = useCallback((num: number) => {
    setCateCount(num);
  }, []);

  const [cateData, setData] = useState<ICate[]>([]);

  const getCate = () => {
    if (catedata.data !== undefined) {
      setData(catedata.data);
    }
  };

  const catedata = useQuery<ICate[]>({
    queryKey: "firstcate",
    queryFn: async () => {
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/catefirst`,
          {},
          { withCredentials: true }
        );
        return data;
      } catch {
        const data = [
          { id: 1, name: "여성의류" },
          { id: 2, name: "남성의류" },
          { id: 3, name: "신발" },
          { id: 4, name: "가방/지갑" },
          { id: 5, name: "시계" },
          { id: 6, name: "쥬얼리" },
          { id: 7, name: "패션 액세서리" },
          { id: 8, name: "디지털" },
          { id: 9, name: "가전제품" },
          { id: 10, name: "스포츠/레저" },
          { id: 11, name: "차량/오토바이" },
          { id: 12, name: "스타굿즈" },
          { id: 13, name: "키덜트" },
          { id: 14, name: "예술/희귀/수집품" },
          { id: 15, name: "음반/악기" },
          { id: 16, name: "도서/티켓/문구" },
          { id: 17, name: "뷰티/미용" },
          { id: 18, name: "가구/인테리어" },
          { id: 19, name: "생활/주방용품" },
          { id: 20, name: "공구/산업용품" },
          { id: 21, name: "식품" },
          { id: 22, name: "유아동/출산" },
          { id: 23, name: "반려동물용품" },
          { id: 24, name: "기타" },
          { id: 25, name: "지역 서비스" },
          { id: 26, name: "구인구직" },
          { id: 27, name: "재능" },
        ];
        return data;
      }
    },
  });

  const btns = useMemo(() => {
    const temp = [];
    for (let i = 0; i < cateData.length / 9; i++) temp.push(i);
    return temp;
  }, [cateData]);

  useEffect(() => {
    getCate();
  }, []);
  console.log(cateData);
  return (
    <div>
      <div className="w-[30rem] overflow-hidden">
        <div className={`px-8 py-10 grid grid-cols-3 gap-8 `}>
          {cateData
            .slice(cateCount * 9, (cateCount + 1) * 9)
            .map((item: ICate, idx: number) => (
              <CategoryItem key={idx} item={item} />
            ))}
        </div>
      </div>
      <div className={`${center}`}>
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
