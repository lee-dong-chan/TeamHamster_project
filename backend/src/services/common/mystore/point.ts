import { Request, Response } from "express";
import { PointHistory, Store } from "../../../models";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;
    const nowstoreid = req.query.id;

    if (!reqbody.user) {
      throw Error("not loged in");
    }

    const nowuser = await Store.findOne({
      where: { id: nowstoreid },
    });

    /// 로그인한 계정이랑 충전하려는 계정이 다름
    if (nowuser?.id != reqbody.user.id) {
      throw Error("not match user");
    }

    await nowuser?.update({
      point: reqbody.user.point + reqbody.pointvalue,
    });

    const pointhistory = await PointHistory.create({
      point: reqbody.pointvalue,
      history: reqbody.history,
    });

    await nowuser?.addPointHistory(pointhistory);

    res.json({ result: "ok" });
  } catch (err) {
    console.error(err);
    res.json({ result: "fail" });
  }
};
