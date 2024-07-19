import { Request, Response } from "express";
import { Address, ExtraAddress, Name } from "../../../models";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;
    if (!reqbody.user) {
      throw Error("not login");
    }
    const address = await ExtraAddress.findAll({
      where: { storeId: reqbody.user.id },
      attributes: ["id", "mobile", "detailAddress"],
      include: [
        { model: Address, as: "Address", attributes: ["address"] },
        { model: Name, as: "Name", attributes: ["name"] },
      ],
    });
    res.json({ extraAddress: address });
  } catch (err) {
    console.error(err);
    res.json({ result: "fail" });
  }
};
