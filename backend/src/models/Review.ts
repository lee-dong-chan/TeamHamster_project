import { DataTypes, Model, Sequelize } from "sequelize";
import Store from "./Store";
import Product from "./Product";

class Review extends Model {
  public readonly id!: number;

  //review
  public star!: number;
  public reviewContent!: string;

  public readonly createdAt!: Date;
  public readonly updateAt!: Date;
  public readonly deletedAt!: Date;

  public static initialize(sequelize: Sequelize) {
    Review.init(
      {
        star: {
          type: DataTypes.TINYINT,
          // defaultValue: 0,
          allowNull: false,
        },
        reviewContent: {
          type: DataTypes.STRING(500),
        },
      },
      {
        sequelize,
        modelName: "Review",
        tableName: "review",
        timestamps: true,
        underscored: true,
        paranoid: true,
      }
    );
  }

  static associate({}: {}) {
    Review.belongsTo(Store, {
      as: "Store",
      foreignKey: "storeId",
    });
    Review.belongsTo(Product, {
      as: "Product",
      foreignKey: "productId",
    });
  }
}

export default Review;
