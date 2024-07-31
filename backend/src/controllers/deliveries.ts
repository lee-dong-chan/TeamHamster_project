import { Router } from "express";
import pickup from "../services/deliveries/pickup";
import pickupid from "../services/deliveries/pickupId";
import pickuplist from "../services/deliveries/pickuplist";
import pickscan from "../services/deliveries/pickscan";
import deliverycheck from "../services/deliveries/deliverycheck";
import deliverycomplete from "../services/deliveries/deliverycomplete";
import nowspot from "../services/deliveries/nowspot";

const router: Router = Router();

router.use(deliverycheck);
router.post("/pickup", pickup); // 픽업대기인 리스트 보여줌
router.post("/pickupId", pickupid); // 선택한 상품을 픽업중으로 바꿔줌
router.post("/pickuplist", pickuplist); // 현재 픽업중인 상품 리스트를 보여줌
router.post("/pickscan/:id", pickscan); // 특정 상품을 픽업완료로 바꿔줌
router.post("/deliverycomplete/:id", deliverycomplete); // 특정 상품을 배송완료로 바꿔줌
router.post("/nowspot", nowspot); // 특정 상품을 배송완료로 바꿔줌

export default router;
