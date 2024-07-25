import axios, { AxiosResponse } from "axios";
import { center } from "../../../lib/styles";
import CategoryItem, { ICate, ICates } from "./CategoryItem";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { errCateFirstData } from "../../../lib/errors";

interface IProps {}

const MenuCategory = ({}: IProps): JSX.Element => {
  const [cateCount, setCateCount] = useState(0);
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const setCatePage = useCallback((num: number) => {
    setCateCount(num);
  }, []);

  const [cateData, setData] = useState<ICates<ICate>>({ category: [] });

  const cateGet = async () => {
    await axios
      .post(`${serverUrl}/catefirst`, {}, { withCredentials: true })
      .then((data: AxiosResponse<ICates<ICate>>) => {
        console.log("cateGet Data", data.data);
        setData(data.data);
      })
      .catch((err) => {
        console.log("cateGet err", err);
        setData(errCateFirstData);
      });
  };

  const btns = useMemo(() => {
    const temp = [];
    for (let i = 0; i < cateData.category.length / 9; i++) temp.push(i);
    return temp;
  }, [cateData]);

  useEffect(() => {
    cateGet();
  }, []);

  return (
    <div>
      <div className="w-[30rem] overflow-hidden">
        <div className={`px-8 py-10 grid grid-cols-3 gap-8 `}>
          {cateData &&
            cateData.category
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
              key={idx}
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
