import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface IProps {}

const MobileLayout = ({}: IProps): JSX.Element => {
  return (
    <div>
      <div className="center h-[6rem] bg-orange-200">
        <div></div>
      </div>
    </div>
  );
};

export default MobileLayout;
