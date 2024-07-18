import { Router } from "express";
const router: Router = Router();
/// 테스트용 코드 위치, 테스트할때 주석해제만 해서 쓰게
import dbtest from "../services/test/dbtest";
// import sessiontest from "../services/test/sessiontest";
import review from "../services/common/review";

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

import layout from "../services/common/layout";
import deliveries from "./deliveries";

/// page
import main from "../services/common/page/main";
import catepage from "../services/common/page/catepage";
import product from "../services/common/page/product";
import search from "../services/common/page/search";
/// write
import extraaddress from "../services/common/write/extraaddress";
import addaddress from "../services/common/write/addaddress";
import productwrite from "../services/common/write/productwrite";
///
import category from "../services/common/category";
import catefirst from "../services/common/catefirst";
/// view
import purchase from "../services/common/view/purchase";
import report from "../services/common/view/report";
/// mystore
import mystore from "../services/common/mystore/mystore";
import mysell from "../services/common/mystore/mysell";
import mypurchase from "../services/common/mystore/mypurchase";
import myreview from "../services/common/mystore/myreview";
import delivery from "../services/common/mystore/delivery";
import reviewWrite from "../services/common/mystore/reviewWrite";
import myStoreNameSet from "../services/common/mystore/myStoreNameSet";
import myStoreContentSet from "../services/common/mystore/myStoreContentSet";
import point from "../services/common/mystore/point";
/// user
import regist from "../services/common/user/regist";
import login from "../services/common/user/login";
import logout from "../services/common/user/logout";
import findemail from "../services/common/user/findemail";
import findpw from "../services/common/user/findpw";
import updatepw from "../services/common/user/updatepw";
import NaverCallback from "../services/common/user/NaverCallback";
import GoogleCallback from "../services/common/user/GoogleCallback";
import imgSave from "../services/common/imgSave";
import testtwo from "../services/test/testtwo";
import admin from "./admin";

router.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: "test",
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
router.get("/dbtest", dbtest);
// router.get("/sessiontest", sessiontest);
// router.post("/review", review);
router.post("/testtwo", testtwo);

///

router.use(layout);
router.use("/deliveries", deliveries);
router.use("/admin", admin);

/// page
router.post("/main", main);
router.post("/category/:id", catepage);
router.post("/product/:id", product);
router.post("/search/:keyword", search);
/// write
router.post("/address", extraaddress);
router.post("/addaddress", addaddress);
router.post("/write", productwrite);
///
router.post("/category", category);
router.post("/catefirst", catefirst);
router.post("/imgSave", ...imgSave);

/// view
router.post("/purchase/:id", purchase);
router.post("/report/:id", report);
/// mystore
router.post("/mystore", mystore);
router.post("/mysell", mysell);
router.post("/mypurchase", mypurchase);
router.post("/review", myreview);
router.post("/delivery/:id", delivery);
router.post("/reviewWrite/:id", reviewWrite);
router.post("/myStoreNameSet", myStoreNameSet);
router.post("/myStoreContentSet", myStoreContentSet);
router.post("/point", point);
/// user
router.post("/regist", regist);
router.post("/login", login);
router.post("/logout", logout);
router.post("/findemail", findemail);
router.post("/findpw", findpw);
router.post("/updatepw", updatepw);
/// OAuth
router.post("/NaverCallback", NaverCallback);
router.post("/GoogleCallback", GoogleCallback);

export default router;
