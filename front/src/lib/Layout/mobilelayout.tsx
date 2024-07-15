import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface IProps {}

const MobileLayout = ({}: IProps): JSX.Element => {
  const url = useLocation();
  const Navigator = useNavigate();
  const Mobile = () => {
    Navigator(`mobile${url.pathname}`);
  };
  useEffect(() => {
    Mobile();
  }, []);
  return (
    <div>
      <div className="Center h-[6rem] bg-orange-200">
        <div></div>
      </div>
    </div>
  );
};

export default MobileLayout;
