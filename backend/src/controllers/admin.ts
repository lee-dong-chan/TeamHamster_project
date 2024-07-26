import { Router } from "express";
/// 권한 체크
import admincheck from "../services/admin/admincheck";
/// 신고 관련
import report from "../services/admin/report";
import reportId from "../services/admin/reportId";
import reportsearch from "../services/admin/reportsearch";
import delproduct from "../services/admin/delproduct";
/// 카테고리 생성
import createcategory from "../services/admin/createcategory";
/// 밴 유저 관련
import manyreportuser from "../services/admin/manyreportuser";
import userblock from "../services/admin/userblock";
import userunblock from "../services/admin/userunblock";
import userblocksearch from "../services/admin/userblocksearch";
/// 포인트 및 배달비 관련
import updatepoint from "../services/admin/updatepoint";
import updatedeliverycost from "../services/admin/updatedeliverycost";
/// 금지 키워드
import keyword from "../services/admin/keyword";
import addkeyword from "../services/admin/addkeyword";
import delkeyword from "../services/admin/delkeyword";
/// 권한 부여
import authority from "../services/admin/authority";
import usersearch from "../services/admin/usersearch";
import blockuser from "../services/admin/blockuser";
const router: Router = Router();

/// 권한 체크
router.use(admincheck);
/// 신고 관련
router.post("/report", report);
router.delete("/report/:id", reportId);
router.post("/reportsearch", reportsearch);
router.delete("/delproduct/:id", delproduct);
/// 카테고리 생성
router.post("/createcategory", createcategory);
/// 밴 유저 관련
router.post("/manyreportuser", manyreportuser);
router.post("/blockuser", blockuser);
router.post("/userblock/:id", userblock);
router.post("/userunblock/:id", userunblock);
router.post("/userblocksearch", userblocksearch);
/// 포인트 및 배달비 관련
router.patch("/updatepoint", updatepoint);
router.patch("/updatedeliverycost", updatedeliverycost);
/// 금지 키워드
router.post("/keyword", keyword);
router.post("/addkeyword", addkeyword);
router.post("/delkeyword", delkeyword);
/// 권한 부여
router.post("/authority", authority);
/// 유저 검색
router.post("/usersearch", usersearch);

export default router;
