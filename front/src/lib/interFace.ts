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

export interface IProduct {
  id?: number;
  title: string;
  discription: string;
  price: number;
  createdAt?: string;
  itemState: string;
  prepayment?: boolean;
  img: string;
  DeliveryCost?: { cost: number };
  Category?: { name: string };
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
