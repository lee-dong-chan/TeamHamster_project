import { Router } from "express";
import admincheck from "../services/admin/admincheck";
import report from "../services/admin/report";
import reportId from "../services/admin/reportId";
import delproduct from "../services/admin/delproduct";
import createcategory from "../services/admin/createcategory";
const router: Router = Router();

router.use(admincheck);
router.post("/report", report);
router.delete("/report/:id", reportId);
router.delete("/delproduct/:id", delproduct);
router.post("/createcategory", createcategory);

export default router;
