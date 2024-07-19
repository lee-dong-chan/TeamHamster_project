import { Product, Review, Store, sequelize } from "../../models";

export default async (id: number) => {
  try {
    const review = await Store.findAll({
      where: { id: id },
      attributes: [[sequelize.fn("avg", sequelize.col("Sell->Review.star")), "star"]],
      include: [
        {
          model: Product,
          as: "Sell",
          attributes: [],
          include: [
            {
              model: Review,
              as: "Review",
              attributes: [],
            },
          ],
        },
      ],
      group: ["Store.id"],
      raw: true,
    });
    const star: number = Math.floor(review[0].star * 10) / 10;
    return star;
  } catch (err) {
    console.error(err);
  }
};
// import { Request, Response } from "express";

// export default async (req: Request, res: Response) => {
//   try {
//     const review = await Store.findAll({
//       where: { id: 1 },
//       attributes: [[sequelize.fn("avg", sequelize.col("Sell->Review.star")), "star"]],
//       include: [
//         {
//           model: Product,
//           as: "Sell",
//           attributes: [],
//           include: [
//             {
//               model: Review,
//               as: "Review",
//               attributes: [],
//             },
//           ],
//         },
//       ],
//       group: ["Store.id"],
//       raw: true,
//     });
//     res.json({ review: review[0] });
//   } catch (err) {
//     console.error(err);
//   }
// };
