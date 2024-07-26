import { Router } from "express";

const router: Router = Router();
/// 테스트용 코드 위치, 테스트할때 주석해제만 해서 쓰게
// import dbtest from "../services/test/dbtest";
// import sessiontest from "../services/test/sessiontest";
// import review from "../services/common/review";
// import testtwo from "../services/test/testtwo";

///
import session from "express-session";
declare module "express-session" {
  export interface SessionData {
    store?: number;
    finduser?: number;
  }
}
import sessionFileStore from "session-file-store";
const FileStore = sessionFileStore(session);

/// 로그인 확인 및 권한 확인
import logincheck from "../services/common/logincheck";
import deliveries from "./deliveries";
import admin from "./admin";
import adminlogin from "../services/admin/adminlogin";
import deliverylogin from "../services/deliveries/deliverylogin";

/// 상단 레이아웃
import layout from "../services/common/layout";
/// 이미지 저장
import imgSave from "../services/common/imgSave";

/// page
import main from "../services/common/page/main";
import catepage from "../services/common/page/catepage";
import product from "../services/common/page/product";
import search from "../services/common/page/search";
import arrayId from "../services/common/page/arrayId";
/// write
import extraaddress from "../services/common/write/extraaddress";
import addaddress from "../services/common/write/addaddress";
import productwrite from "../services/common/write/productwrite";
/// 카테고리 관련
import category from "../services/common/category";
import catefirst from "../services/common/catefirst";
import catelist from "../services/common/catelist";
import catelistthird from "../services/common/catelistthird";

/// view
import purchase from "../services/common/view/purchase";
import report from "../services/common/view/report";
/// mystore
import mystore from "../services/common/mystore/mystore";
import mysell from "../services/common/mystore/mysell";
import mypurchase from "../services/common/mystore/mypurchase";
import myreview from "../services/common/mystore/myreview";
import GpsRiderGet from "../services/common/mystore/GpsRiderGet";
import GpsUserGet from "../services/common/mystore/GpsUserGet";
import reviewWrite from "../services/common/mystore/reviewWrite";
import myStoreNameSet from "../services/common/mystore/myStoreNameSet";
import myStoreContentSet from "../services/common/mystore/myStoreContentSet";
import myStoreProfileImg from "../services/common/mystore/myStoreProfileImg";
import point from "../services/common/mystore/point";
import purchaseCheck from "../services/common/mystore/purchaseCheck";

/// user
import regist from "../services/common/user/regist";
import login from "../services/common/user/login";
import logout from "../services/common/user/logout";
import findemail from "../services/common/user/findemail";
import findpw from "../services/common/user/findpw";
import updatepw from "../services/common/user/updatepw";
/// user 중 OAuth
import NaverCallback from "../services/common/user/NaverCallback";
import GoogleCallback from "../services/common/user/GoogleCallback";
import deliverycost from "../services/common/deliverycost";
import pointpercent from "../services/common/pointpercent";

router.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: process.env.SESSION || "test",
    name: "store-session",
    store: new FileStore({
      reapInterval: 60,
      path: "./login-session",
    }),
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
  })
);
/// 테스트용 코드
// router.get("/dbtest", dbtest);
// router.get("/sessiontest", sessiontest);
// router.post("/review", review);
// router.post("/testtwo", testtwo);

/// 로그인 확인 및 권한 확인
router.use(logincheck);
router.use("/delivery", deliveries);
router.use("/admin", admin);
router.post("/adminlogin", adminlogin);
router.post("/deliverylogin", deliverylogin);

/// 상단 레이아웃
router.post("/layout", layout);
/// 이미지 저장
router.post("/imgSave", imgSave);

/// page
router.post("/main", main);
router.post("/category/:id", catepage);
router.post("/product/:id", product);
router.post("/search", search);
router.post("/recent", arrayId); // 특정 상품번호만 보여주게(최근본 상품)
/// write
router.post("/address", extraaddress);
router.post("/addaddress", addaddress);
router.post("/write", productwrite);
/// 카테고리 관련
router.post("/category", category);
router.post("/catefirst", catefirst);
router.post("/catelist/:id", catelist);
router.post("/catelistthird/:id", catelistthird);
/// view
router.post("/purchase/:id", purchase);
router.post("/report/:id", report);
/// mystore
router.post("/mystore", mystore);
router.post("/mysell", mysell);
router.post("/mypurchase", mypurchase);
router.post("/review", myreview);
router.post("/GpsRiderGet/:id", GpsRiderGet);
router.post("/GpsUserGet/:id", GpsUserGet);
router.post("/reviewWrite/:id", reviewWrite);
router.post("/myStoreNameSet", myStoreNameSet);
router.post("/myStoreContentSet", myStoreContentSet);
router.post("/myStoreProfileImg", myStoreProfileImg);

router.post("/point", point);
router.post("/purchaseCheck/:id", purchaseCheck); /// 구매 확정

/// user
router.post("/regist", regist);
router.post("/login", login);
router.post("/logout", logout);
router.post("/findemail", findemail);
router.post("/findpw", findpw);
router.post("/updatepw", updatepw);

/// user 중 OAuth
router.post("/NaverCallback", NaverCallback);
router.post("/GoogleCallback", GoogleCallback);

router.post("/deliverycost", deliverycost);
router.post("/pointpercent", pointpercent);

export default router;
