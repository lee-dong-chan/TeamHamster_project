import { Router } from "express";
import pickup from "../services/deliveries/pickup";
import pickupid from "../services/deliveries/pickupId";
import pickscan from "../services/deliveries/pickscan";
import pickuplist from "../services/deliveries/pickuplist";
import deliverycheck from "../services/deliveries/deliverycheck";

const router: Router = Router();

router.use(deliverycheck);
router.post("/pickup", pickup);
router.post("/pickup/:id", pickupid);
router.post("/pickscan/:id", pickscan);
router.post("/pickuplist", pickuplist);

export default router;
