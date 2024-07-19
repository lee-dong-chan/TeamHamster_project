import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { box, center } from "../../../lib/styles";
import { Link } from "react-router-dom";
import { Debounce } from "../../../CustomHook/Debounce";

interface IProps {}

const Search = ({}: IProps): JSX.Element => {
  const [content, setContent] = useState<string>("");
  const [searchlog, setSearchLog] = useState("");
  const saveContent = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  }, []);

  const search = Debounce(content, 1000);

  const savelog = () => {};
  const cookie = useMemo(() => {}, []);

  useEffect(() => {
    console.log(search);
  }, [search]);
  return (
    <div>
      <div className={`${box}`}>
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
                onClick={() => {
                  savelog();
                }}
                className={`${center} w-[4rem] h-[3rem] bg-orange-200 border rounded-e `}
              >
                검색
              </div>
            </Link>
          ) : (
            <div
              className={`${center} w-[4rem] h-[3rem] bg-orange-200 border rounded-e`}
            >
              검색
            </div>
          )}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Search;
