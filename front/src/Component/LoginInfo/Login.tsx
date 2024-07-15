import { Link } from "react-router-dom";

interface IProps {}

const Login = ({}: IProps): JSX.Element => {
  return (
    <div className="Center gap-4 text-gray-500 ">
      <div>
        {<div className="">{`${"??"}님`}</div>}
        {<div className="">{`보유포인트:${"100"}포인트`}</div>}
        <div className=" Center w-[5rem] border rounded bg-blue-100 ">
          로그아웃
        </div>
      </div>
      <Link to={"/point"}>
        <div className="px-2 py-3 w-[5.5rem] bg-blue-100 border rounded">
          포인트충전
        </div>
      </Link>
      <Link to={"/mystore"}>
        <div className="Center px-2 py-3 w-[5rem] bg-blue-200 border rounded">
          내상점
        </div>
      </Link>
    </div>
  );
};

export default Login;
