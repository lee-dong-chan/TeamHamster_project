import { Router } from "express";
import admincheck from "../services/admin/admincheck";
import report from "../services/admin/report";
import reportId from "../services/admin/reportId";
import delproduct from "../services/admin/delproduct";
import createcategory from "../services/admin/createcategory";
import user from "../services/admin/user";
import userblock from "../services/admin/userblock";
import userunblock from "../services/admin/userunblock";
import pointpercent from "../services/admin/pointpercent";
import updatepoint from "../services/admin/updatepoint";
import deliverycost from "../services/admin/deliverycost";
import updatedeliverycost from "../services/admin/updatedeliverycost";
import keyword from "../services/admin/keyword";
import addkeyword from "../services/admin/addkeyword";
import delkeyword from "../services/admin/delkeyword";
import userblocksearch from "../services/admin/userblocksearch";
import reportsearch from "../services/admin/reportsearch";
const router: Router = Router();

router.use(admincheck);
/// 신고 관련
router.post("/report", report);
router.delete("/report/:id", reportId);
router.post("reportsearch", reportsearch);
router.delete("/delproduct/:id", delproduct);
///
router.post("/createcategory", createcategory);
/// 밴 유저 관련
router.post("/user", user);
router.post("/userblock/:id", userblock);
router.post("/userunblock/:id", userunblock);
router.post("/userblocksearch", userblocksearch);
/// 포인트 관련
router.post("/pointpercent", pointpercent);
router.patch("/updatepoint", updatepoint);
router.post("/deliverycost", deliverycost);
router.patch("/updatedeliverycost", updatedeliverycost);
/// 금지키워드
router.post("/keyword", keyword);
router.post("/addkeyword", addkeyword);
router.post("/delkeyword", delkeyword);

export default router;
