import { Link } from "react-router-dom";

import { Button } from "../../../lib/Button/Button";
import { TinyButton } from "../../Button/Button";
import MenuCategory from "./MenuCategory";

interface IProps {
  ModalOff(): void;
}

const Menu = ({ ModalOff }: IProps): JSX.Element => {
  const pointBtn = new Button("포인트충전", "bg-orange-200");
  const myStore = new Button("내상점", "bg-orange-200");
  return (
    <div className="MobileBox">
      <div className="flex items-center justify-between">
        <div>
          <div>이동찬 님</div>
          <div>
            현재 보유포인트:<span className="text-orange-300">1000</span>포인트
          </div>
        </div>
        <div className="flex gap-2">
          <Link to={"/point"}>
            <div onClick={ModalOff}>
              <TinyButton btn={pointBtn} />
            </div>
          </Link>
          <Link to={"/mystore"}>
            <div onClick={ModalOff}>
              <TinyButton btn={myStore} />
            </div>
          </Link>
        </div>
      </div>
      <div className="py-3">
        <div className="text-[1.2rem] font-bold">추천 목록 선택</div>
        <MenuCategory ModalOff={ModalOff} />
      </div>
      <div></div>
    </div>
  );
};

export default Menu;
