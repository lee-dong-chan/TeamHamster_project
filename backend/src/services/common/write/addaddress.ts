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
    if (!reqbody.name || !reqbody.address) {
      throw Error("not name OR address");
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
      throw Error("not login");
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

    res.json({ login: reqbody.user, result: "ok" });
  } catch (err) {
    console.error(err);
    await transaction.rollback();
    res.json({ result: "fail" });
  }
};
