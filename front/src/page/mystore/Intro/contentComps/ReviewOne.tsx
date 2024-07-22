import { rowfont, weightfont } from "../../../../lib/styles";
import Star from "../../../../Component/Star/Star";
import { IReviewOne } from "../../../../lib/interFace";

const ReviewOne = ({ data }: { data: IReviewOne }) => {
  return (
    <div className={`flex w-[100%] h-[120px]`}>
      {/* 이미지 */}
      <div
        style={{
          backgroundImage: `url(${data.Store.img})`,
        }}
        className={`rounded-full bg-cover h-[50px] w-[50px]`}
      ></div>
      {/* 내용 */}
      <div
        className="overflow-scroll pl-2 w-[500px]"
        style={{ scrollbarWidth: "none" }}
      >
        <div className={`${rowfont} font-medium`}>{data.Store.nick}</div>

        <Star storeStar={data.star} textActive={false} centerOn={false}></Star>

        <div className={`${weightfont} `}>{data.Product.title}</div>
        <div className={`${rowfont} font-medium break-keep`}>
          {data.reviewContent}
        </div>
      </div>
    </div>
  );
};

export default ReviewOne;
