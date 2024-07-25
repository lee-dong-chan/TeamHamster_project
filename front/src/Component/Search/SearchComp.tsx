import { Link } from "react-router-dom";

import { ChangeEvent, useCallback, useEffect, useState } from "react";
import Category from "../Category/Category";
import { center } from "../../lib/styles";
import { Debounce } from "../../CustomHook/Debounce";
import axios, { AxiosResponse } from "axios";
import { IChild } from "../Category/categoryItem";

interface IProps {}

export interface ICategory {
  id: number;
  name: string;
  Children: IChild[];
}
const SearchComp = ({}: IProps): JSX.Element => {
  const [content, setContent] = useState<string>("");
  const [catedata, setCateData] = useState<ICategory>();
  const saveContent = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  }, []);

  const search = Debounce(content, 800);

  const getcategory = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/category`,
        { category: search },
        { withCredentials: true }
      )
      .then((data: AxiosResponse) => {
        console.log(data);
        const category: ICategory = data.data.category;
        setCateData(category);
      })
      .catch(() => {
        setCateData({
          id: 5,
          name: "자동차",
          Children: [{ id: 3, name: "오류임" }],
        });
      });
  };
  console.log(catedata);

  useEffect(() => {
    getcategory();

    console.log(search);
  }, [search]);

  return (
    <div className="h-[15rem] flex justify-center">
      <div className="h-[15rem] w-[100%] flex justify-center absolute">
        <img className="w-[100%] h-[100%] absolute z-0" src="/imgs/banner.png"></img>
        <div className="flex min-w-[60rem] gap-[9rem]">
          <img className="w-[8rem] relative" src="/imgs/good.png"></img>
          <div className="py-8 relative text-[1.4rem] text-white font-bold text-center">
            믿을수 있는 중고거래 <br></br>따봉 햄스터가 여러분의 안전한 거래를 응원합니다!
          </div>
        </div>
      </div>
      <div className="pt-[7rem] relative flex ">
        <div className="h-[3rem] w-[3rem] border rounded">
          <img className="h-[100%] w-[100%]" src="/imgs/listsearch.png"></img>
        </div>
        <div>
          <input
            className="ms-3 px-3 h-[3rem] w-[20rem] outline-none text-gray-500 border"
            placeholder="카테고리 또는 상품의 이름을 입력하세요"
            onInput={saveContent}
            value={content}
          ></input>
          {search ? <Category content={content} category={catedata} /> : ""}
        </div>
        {content ? (
          <Link to={`/search/${content}`}>
            <div className={`${center} px-2 h-[3rem] border rounded-e bg-blue-100 text-gray-500`}>
              검색
            </div>
          </Link>
        ) : (
          <div className={`${center} px-2 h-[3rem] border rounded-e bg-blue-100 text-gray-500`}>
            검색
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchComp;
