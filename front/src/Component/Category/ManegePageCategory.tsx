import { useState } from "react";
import { Link } from "react-router-dom";

const ManegePageCategory = (): JSX.Element => {
  const [manegecate, setManegeCate] = useState("report");
  const report = (): void => {
    setManegeCate("report");
  };
  const category = (): void => {
    setManegeCate("cate");
  };
  const keyword = (): void => {
    setManegeCate("keyword");
  };
  const user = (): void => {
    setManegeCate("user");
  };
  const point = (): void => {
    setManegeCate("point");
  };
  const delivery = (): void => {
    setManegeCate("delivery");
  };

  return (
    <div className="pt-20 pb-10 Center gap-20 text-[1.2rem] text-gray-500 font-bold">
      <Link to={"/manege/report"}>
        {manegecate == "report" ? (
          <div className="text-orange-500">신고관리</div>
        ) : (
          <div onClick={report}>신고관리</div>
        )}
      </Link>
      <Link to={"/manege/category"}>
        {manegecate == "cate" ? (
          <div className="text-orange-500">카테고리관리</div>
        ) : (
          <div onClick={category}>카테고리관리</div>
        )}
      </Link>
      <Link to={"/manege/keyword"}>
        {manegecate == "keyword" ? (
          <div className="text-orange-500">금지키워드관리</div>
        ) : (
          <div onClick={keyword}>금지키워드관리</div>
        )}
      </Link>
      <Link to={"/manege/user"}>
        {manegecate == "user" ? (
          <div className="text-orange-500">유저관리</div>
        ) : (
          <div onClick={user}>유저관리</div>
        )}
      </Link>
      <Link to={"/manege/point"}>
        {manegecate == "point" ? (
          <div className="text-orange-500">충전비율설정</div>
        ) : (
          <div onClick={point}>충전비율설정</div>
        )}
      </Link>
      <Link to={"/manege/delivery"}>
        {manegecate == "delivery" ? (
          <div className="text-orange-500">배송비</div>
        ) : (
          <div onClick={delivery}>배송비</div>
        )}
      </Link>
    </div>
  );
};

export default ManegePageCategory;
