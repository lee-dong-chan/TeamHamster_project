import { Request, Response } from "express";
import { Category, DeliveryCost, Product, Review } from "../../../models";

export default async (req: Request, res: Response) => {
  try {
    const nowstoreid = req.query.id;

    let product: {
      rows: Product[];
      count: number;
    } = await Product.findAndCountAll({
      where: { purchaseId: nowstoreid },
      attributes: ["id", "title", "discription", "price", "createdAt", "itemState", "img"],
      include: [
        { model: DeliveryCost, as: "DeliveryCost", attributes: ["cost"] },
        { model: Category, as: "Category", attributes: ["name"] },
      ],
    });

    for (let i = 0; i < product.rows.length; i++) {
      if (product.rows[i].img) {
        const splimg = product.rows[i].img.split(",");
        product.rows[i].dataValues.image = splimg;

        if (
          product.rows[i].itemState == "픽업 대기" ||
          product.rows[i].itemState == "픽업 중" ||
          product.rows[i].itemState == "픽업 완료"
        ) {
          product.rows[i].itemState = "배송중";
        } else if (product.rows[i].itemState == "배송 완료") {
          product.rows[i].itemState = "배송중";
          product.rows[i].userCheck = true;
        } else if (product.rows[i].itemState == "구매 확정") {
          product.rows[i].itemState = "구매 완료";
          const duplicationcheck = await Review.findOne({
            where: { productId: product.rows[i].id, storeId: nowstoreid },
          });
          if (duplicationcheck) {
            product.rows[i].userCheck = true;
          }
        }
      }
    }
    res.json({ product: product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: "fail" });
  }
};
