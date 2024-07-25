import Category from "../Component/Category/Category";
import { IProductPage, IUserDatas } from "./interFace";

export const errCateFirstData = {
  category: [
    { id: 1, name: "여성의류" },
    { id: 2, name: "남성의류" },
    { id: 3, name: "신발" },
    { id: 4, name: "가방/지갑" },
    { id: 5, name: "시계" },
    { id: 6, name: "쥬얼리" },
    { id: 7, name: "패션 액세서리" },
    { id: 8, name: "디지털" },
    { id: 9, name: "가전제품" },
    { id: 10, name: "스포츠/레저" },
    { id: 11, name: "차량/오토바이" },
    { id: 12, name: "스타굿즈" },
    { id: 13, name: "키덜트" },
    { id: 14, name: "예술/희귀/수집품" },
    { id: 15, name: "음반/악기" },
    { id: 16, name: "도서/티켓/문구" },
    { id: 17, name: "뷰티/미용" },
    { id: 18, name: "가구/인테리어" },
    { id: 19, name: "생활/주방용품" },
    { id: 20, name: "공구/산업용품" },
    { id: 21, name: "식품" },
    { id: 22, name: "유아동/출산" },
    { id: 23, name: "반려동물용품" },
    { id: 24, name: "기타" },
    { id: 25, name: "지역 서비스" },
    { id: 26, name: "구인구직" },
    { id: 27, name: "재능" },
  ],
};

export const errUserDatas = {
  login: {
    admin: false,
    delivery: false,
    id: 123456789101112,
    nick: "오류이씹",
    point: 0,
  },
};

export const buyContentsErr = [
  {
    title: "오류시 나오는 전설의 따봉스터",
    discription: "따봉스터도 나오지 않는 전설의 오류",
    price: 123456789,
    itemState: "구매 완료", //배송중 - 배송현황,판매 완료 - 배송 완료,판매중 - 정보 수정
    img: "good.png",
  },
  {
    title: "오류시 나오는 전설의 따봉스터",
    discription: "따봉스터도 나오지 않는 전설의 오류",
    price: 123456789,
    itemState: "배송중",
    img: "good.png",
  },
];

export const sellContentsErr = [
  {
    title: "오류시 나오는 전설의 따봉스터",
    discription: "따봉스터도 나오지 않는 전설의 오류",
    price: 123456789,
    itemState: "판매 완료",
    img: "good.png",
  },
  {
    title: "오류시 나오는 전설의 따봉스터",
    discription: "따봉스터도 나오지 않는 전설의 오류",
    price: 123456789,
    itemState: "배송중",
    img: "good.png",
  },
  {
    title: "오류시 나오는 전설의 따봉스터",
    discription: "따봉스터도 나오지 않는 전설의 오류",
    price: 123456789,
    itemState: "판매중",
    img: "good.png",
  },
];

export const productPageDataErr: IProductPage = {
  id: 1,
  title: "에러엇",
  discription: "또에럿",
  price: 10,
  createdAt: new Date() + "",
  itemState: "판매중",
  prepayment: false,
  img: "hamster.png",
  DeliveryCost: { cost: 10 },
  Category: { name: "에러따봉스" },
  categoryId: 1,
  Sell: {
    id: 1,
    nick: "에러따봉햄스터",
    star: {
      star: "3",
    },
  },
  image: ["hamster.png", "HamsterRider.png", "HamsterWaiter.png"],
  //아직 서버에서 미추가
  islogin: true,
};
