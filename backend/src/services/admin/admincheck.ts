import { Request, Response, NextFunction } from "express";
import { Store, User } from "../../models";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reqbody = req.body;
    if (!reqbody.user) {
      throw Error("not login");
    }
    const admincheck: Store | null = await Store.findOne({
      where: { id: reqbody.user.id },
      include: [{ model: User, as: "User", where: { admin: true } }],
    });
    if (!admincheck) {
      throw Error("not admin");
    }
    next();
  } catch (err: any) {
    console.error(err);
    if (err.message == "not login") {
      res.json({ result: "not login" });
    } else if (err.message == "not admin") {
      res.json({ result: "not admin" });
    } else {
      res.json({ result: "fail" });
    }
  }
};
