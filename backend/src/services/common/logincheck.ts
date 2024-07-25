import { Request, Response, NextFunction } from "express";
import { Store } from "../../models";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.session.store) {
      req.body.user = await Store.findOne({
        where: { userId: req.session.store },
        attributes: ["id", "nick", "point"],
        raw: true,
      });
    }
    console.log("asdasdzxczxczxc");
    console.log(req.body);
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: "fail" });
  }
};
