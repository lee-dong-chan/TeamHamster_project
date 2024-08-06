import { Request, Response } from "express";
import { Product } from "../../models";

export default async (req: Request, res: Response) => {
  try {
    const complete: Product[] = await Product.findAll({
      where: { itemState: "픽업 완료" },
    });

    res.json({ complete: complete });
  } catch (err) {
    console.error(err);
    res.json({ result: "fail" });
  }
};
