import { Request, Response } from "express";
import { PointHistory, Store } from "../../../models";
import { point } from "../../../models/mongoDB";

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
    const pointpercent = await point.findOne({}, { pointPercent: 1, _id: 0 }).sort({ _id: -1 });
    if (!pointpercent?.pointPercent) {
      throw Error("err");
    }
    const chargepoint = (reqbody.pointvalue / 1000) * pointpercent?.pointPercent;

    await nowuser?.update({
      point: reqbody.user.point + chargepoint,
    });

    const pointhistory = await PointHistory.create({
      point: reqbody.pointvalue,
      history: reqbody.history,
    });

    await nowuser?.addPointHistory(pointhistory);

    res.json({ result: "ok" });
  } catch (err: any) {
    console.error(err);
    if (err.message == "not loged in") {
      res.status(400).json({ result: "not loged in" });
    } else if (err.message == "not match user") {
      res.status(400).json({ result: "not match user" });
    } else {
      res.status(500).json({ result: "fail" });
    }
  }
};
