import { Request, Response } from "express";
import { PointHistory, Store } from "../../../models";
import { point } from "../../../models/mongoDB";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;

    if (!reqbody.user) {
      throw Error("not loged in");
    }

    const nowuser = await Store.findOne({
      where: { id: reqbody.user.id },
    });

    const pointpercent = await point.findOne({}, { pointPercent: 1, _id: 0 }).sort({ _id: -1 });
    if (!pointpercent?.pointPercent) {
      throw Error("err");
    }
    // 포인트 충전량 관련
    // const chargepoint = (reqbody.pointvalue / 1000) * pointpercent?.pointPercent;
    const chargepoint = reqbody.pointvalue;

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
    } else {
      res.status(500).json({ result: "fail" });
    }
  }
};
