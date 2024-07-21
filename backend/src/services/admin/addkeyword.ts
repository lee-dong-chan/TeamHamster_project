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
  } catch (err) {
    console.error(err);
    res.json({ result: "fail" });
  }
};
