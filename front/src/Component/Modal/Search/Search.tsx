import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { box, center, mobilebox } from "../../../lib/styles";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSetRecoilState } from "recoil";
import { Modal } from "../../../Context/Modal";
import { useBreakPoint } from "../../../CustomHook/BreakPoint";

interface IProps {}

const Search = ({}: IProps): JSX.Element => {
  const { ismobile, isdesktop } = useBreakPoint();
  const [cookies, setCookie, removeCookie] = useCookies(["search"]);
  const [content, setContent] = useState<string>("");
  const [searchlog, setSearchLog] = useState("");
  const setmodal = useSetRecoilState(Modal);

  const saveContent = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  }, []);

  const handleCookie = (search: string) => {
    setCookie(
      "search",
      {
        search: search,
      },
      {
        path: "/",
      }
    );
  };
  const save = () => {
    if (recentsearch.length < 10) {
      handleCookie(searchlog + `+${content}`);
    }
  };
  const remove = () => {
    removeCookie("search");
    setSearchLog("");
  };

  const recentsearch = searchlog
    .split("+")
    .filter((item) => item != "")
    .filter((item, idx) => {
      return (
        searchlog
          .split("+")
          .filter((item) => item != "")
          .indexOf(item) === idx
      );
    });

  useEffect(() => {
    if (cookies.search) {
      setSearchLog(cookies.search.search);
    }
  }, [cookies.search]);

  useEffect(() => {
    if (isdesktop) {
      setmodal(undefined);
    }
  }, [isdesktop]);
  console.log(recentsearch.length);
  return (
    <div>
      <div className={`${mobilebox}`}>
        <div className={`${center}`}>
          <input
            className="p-2 w-[20rem] h-[3rem]  border"
            placeholder="검색어를 입력하세요"
            value={content}
            onInput={saveContent}
          ></input>
          {content ? (
            <Link to={`/search/${content}`}>
              <div
                onClick={save}
                className={`${center} w-[4rem] h-[3rem] bg-orange-200 border rounded-e text-white`}
              >
                검색
              </div>
            </Link>
          ) : (
            <div
              className={`${center} w-[4rem] h-[3rem] bg-orange-200 border rounded-e text-white`}
            >
              검색
            </div>
          )}
        </div>
        <div className="px-[3.5rem] py-5 h-[30rem] ">
          <div className="py-5 text-[1.3rem]">최근검색어</div>
          {cookies.search ? (
            recentsearch.map((item: string, idx: number) => (
              <Link key={idx} to={`/search/${item}`}>
                <div className="py-2 text-[1.2rem]">
                  <span className="pe-4 text-orange-500">{idx + 1}</span>
                  {item}
                </div>
              </Link>
            ))
          ) : (
            <div>현재 최근검색어가 없습니다.</div>
          )}
        </div>
      </div>
      <div className="pe-5 flex justify-end">
        <div
          onClick={remove}
          className="p-1 border rounded bg-orange-200 text-white"
        >
          검색어 초기화
        </div>
      </div>
    </div>
  );
};

export default Search;
