import { Request, Response } from "express";
import { Address, Category, ExtraAddress, Product, Report, Store } from "../../models";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;
    const selectreport: string = req.params.id;

    const nowadmin: Store | null = await Store.findOne({
      where: { id: reqbody.user.id },
    });
    const delreport: Report | null = await Report.findOne({
      where: { id: selectreport },
    });
    /// 누가 삭제했는지 확인할수있게
    await nowadmin?.addReport(delreport);

    delreport?.destroy();

    res.json({ result: "ok" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: "fail" });
  }
};
