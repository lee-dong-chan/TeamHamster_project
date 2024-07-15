import { Link } from "react-router-dom";

interface IProps {}

const NotLogin = ({}: IProps): JSX.Element => {
  return (
    <Link to={"/login"}>
      <div className="px-4 py-2 border bg-blue-100 rounded text-[1.2rem]">
        로그인
      </div>
    </Link>
  );
};

export default NotLogin;
