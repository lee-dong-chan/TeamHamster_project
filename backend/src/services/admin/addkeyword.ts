import { Request, Response } from "express";
import { bankeyword } from "../../models/mongoDB";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;
    if (reqbody.keyword.length < 2) {
      throw Error("short");
    }
    await bankeyword.create({ word: reqbody.keyword });

    res.json({ result: "ok" });
  } catch (err: any) {
    console.error(err);
    if (err.message == "short") {
      res.status(400).json({ result: "short keyword" });
    } else {
      res.status(500).json({ result: "fail" });
    }
  }
};
