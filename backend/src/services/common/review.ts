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
