import { getClip } from "../../lib/func";
import { center } from "../../lib/styles";

interface IProps {
  storeStar: number;
  textActive?: boolean;
  centerOn?: boolean;
}

const Star = ({ storeStar, textActive = true, centerOn = true }: IProps) => {
  return (
    <div className={`relative ${centerOn && `${center}`}`}>
      <div className="flex">
        <div className={`text-yellow-300 z-10 ${getClip(storeStar)}`}>
          ★★★★★
        </div>
        <div className="absolute top-0 text-white">★★★★★</div>
        {textActive ? (
          <div className={`pl-1 font-medium text-white`}>{storeStar}</div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Star;
