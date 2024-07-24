import { Request, Response, query } from "express";
import { Store, User } from "../../models";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;
    const nowuser = reqbody.id;

    if (!nowuser) {
      throw Error("err");
    }

    const usedata = await User.findOne({
      where: { Oauth: "햄스터" },
      include: { model: Store, as: "Store", where: { id: nowuser } },
    });

    if (usedata?.id == 1) {
      throw Error("not change first user");
    }

    let authoritysuperadmin = reqbody.superadmin;
    let authorityadmin = reqbody.admin;
    let authoritydelivery = reqbody.delivery;

    // 프론트 오류 방지
    if (!authoritysuperadmin) {
      authoritysuperadmin = false;
    } else {
      authorityadmin = true;
    }

    // 프론트 오류 방지
    if (!authorityadmin) {
      authorityadmin = false;
      authoritysuperadmin = false;
    }

    if (!authoritydelivery) {
      authoritydelivery = false;
    }

    await usedata?.update({
      superAdmin: authoritysuperadmin,
      admin: authorityadmin,
      delivery: authoritydelivery,
    });

    res.json({ result: "ok" });
  } catch (err) {
    console.error(err);
    res.json({ result: "fail" });
  }
};
