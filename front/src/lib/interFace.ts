export interface IIntro {
  intro: {
    storeName: string;
    storePoint: number;
    storeIntro: string;
    storeStar: number;
    storePFImg: string;
    sellCount: number;
    loginCheck: boolean;
  };
  getPageValues: () => void;
}

//유저 로그인

export interface IUserDatas {
  login?: {
    admin: boolean;
    delivery: boolean;
    id: number;
    nick: string;
    point: number;
  };
}

//유저 스토어

export interface IMyStoreRes {
  login?: {
    id: number;
    nick: string;
    point: number;
  };
  store: {
    id?: number;
    nick: string;
    point: number;
    Introduction: string;
    star: { star: number };
    profileimg: string;
    sellCount: number;
  };
  loginuser: boolean;
}

// 게시글 관련

interface IProductMini {
  id?: number;
  title: string;
  discription: string;
  price: number;
  createdAt?: string;
  itemState: string;
  prepayment?: boolean;
  img?: string;
}

export interface IProduct extends IProductMini {
  DeliveryCost?: { cost: number };
  Category?: { name: string };
  image?: string[];
}

export interface IProductPage extends IProduct {
  categoryId?: number;
  Sell: {
    id: number;
    nick: string;
    star: {
      star: string;
    };
  };
  image: string[];
  islogin: boolean;
}

export interface IProductRes {
  product: {
    count?: number;
    rows: IProduct[];
  };
}

//리뷰관련
export interface IReviewOne {
  star: number;
  reviewContent: string;
  Store: {
    nick: string;
    img: string;
  };
  Product: {
    title: string;
  };
}

export interface IReviewRes {
  reviewCount?: number;
  reviewAverage?: {
    star: number;
  };
  reviewPercent?: number;
  reviewlist: IReviewOne[];
}
