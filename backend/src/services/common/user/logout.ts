import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
  try {
    req.session.destroy(() => {});

    res.cookie("store-session", "", {
      maxAge: 0,
      signed: true,
    });

    res.json({ result: "ok" });
  } catch (err) {
    console.error(err);
    res.json({ result: "fail" });
  }
};
