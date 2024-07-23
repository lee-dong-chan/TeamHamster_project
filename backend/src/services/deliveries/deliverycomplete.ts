import { Request, Response } from "express";
import { Product } from "../../models";

export default async (req: Request, res: Response) => {
  try {
    const selectproduct: string = req.params.id;

    const complete: Product | null = await Product.findOne({
      where: { id: selectproduct, itemState: "픽업 완료" },
    });
    if (!complete) {
      throw Error("err");
    }
    await complete.update({ itemState: "배송 완료" });

    res.json({ result: "ok" });
  } catch (err) {
    console.error(err);
    res.json({ result: "fail" });
  }
};
