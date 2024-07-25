import { Request, Response } from "express";
import { Address, ExtraAddress, Name, Store, sequelize } from "../../../models";
import { Transaction } from "sequelize";

export default async (req: Request, res: Response) => {
  const transaction: Transaction = await sequelize.transaction();
  try {
    const reqbody = req.body;
    if (!reqbody.user) {
      throw Error("not login");
    }
    console.log(reqbody);
    if (!reqbody.name || !reqbody.address || !reqbody.mobile) {
      throw Error("not name OR address OR mobile");
    }

    const nowuser: Store | null = await Store.findOne({
      where: { id: reqbody.user.id },
    });
    const name: Name | null = await Name.findOne({
      where: { name: reqbody.name },
    });
    const address: Address | null = await Address.findOne({
      where: { address: reqbody.address },
    });

    const extraaddress: ExtraAddress = await ExtraAddress.create(
      {
        detailAddress: reqbody.detailaddress,
        mobile: reqbody.mobile,
      },
      { transaction }
    );

    if (nowuser) {
      await transaction.commit();
      await nowuser.addExtraAddress(extraaddress);
    } else {
      throw Error("not find user");
    }

    if (name) {
      await name.addExtraAddress(extraaddress);
    } else {
      const newname = await Name.create({
        name: reqbody.name,
      });
      await newname.addExtraAddress(extraaddress);
    }

    if (address) {
      await address.addExtraAddress(extraaddress);
    } else {
      const newaddress = await Address.create({
        address: reqbody.address,
      });
      await newaddress.addExtraAddress(extraaddress);
    }

    res.json({ result: "ok" });
  } catch (err: any) {
    console.error(err);
    await transaction.rollback();
    if (err.message == "not login") {
      res.status(400).json({ result: "not login" });
    } else if (err.message == "not find user") {
      res.status(400).json({ result: "not find user" });
    } else if (err.message == "not name OR address OR mobile") {
      res.status(400).json({ result: "not name OR address OR mobile" });
    } else {
      res.status(500).json({ result: "fail" });
    }
  }
};
