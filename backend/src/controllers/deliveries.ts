import { Router } from "express";
import pickup from "../services/deliveries/pickup";
import pickupid from "../services/deliveries/pickupId";
import pickscan from "../services/deliveries/pickscan";
import pickuplist from "../services/deliveries/pickuplist";

const router: Router = Router();

router.post("/pickup", pickup);
router.post("/pickup/:id", pickupid);
router.post("/pickscan/:id", pickscan);
router.post("/pickuplist", pickuplist);

export default router;
