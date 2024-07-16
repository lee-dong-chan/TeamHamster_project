import { Request, Response, Router } from "express";
import dbtest from "../services/dbtest";

const router: Router = Router();

// import catetest from "../services/category";

router.get("/", dbtest);

// router.get("/", (req: Request, res: Response) => {
//   CategoryTest.create({ name: "12" });
//   res.json("ok");
// });

export default router;
