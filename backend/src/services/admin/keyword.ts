import { Request, Response } from "express";
import { bankeyword } from "../../models/mongoDB";

export default async (req: Request, res: Response) => {
  try {
    const keyword = await bankeyword.find({}, { word: 1, _id: 0 });

    res.json({ keyword: keyword });
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: "fail" });
  }
};
