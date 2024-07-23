import { Request, Response, query } from "express";
import { Store, User } from "../../models";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;
    const nowuser = req.query.id;
    const usedata = await User.findOne({
      include: { model: Store, as: "Store", where: { id: nowuser } },
    });
    let authorityadmin = reqbody.admin;
    let authoritydelivery = reqbody.delivery;

    if (!authorityadmin) {
      authorityadmin = false;
    }
    if (!authoritydelivery) {
      authoritydelivery = false;
    }

    await usedata?.update({
      admin: authorityadmin,
      delivery: authoritydelivery,
    });

    res.json({ result: "ok" });
  } catch (err) {
    console.error(err);
    res.json({ result: "fail" });
  }
};
