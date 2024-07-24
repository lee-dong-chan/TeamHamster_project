import { IProductPage } from "./interFace";

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
