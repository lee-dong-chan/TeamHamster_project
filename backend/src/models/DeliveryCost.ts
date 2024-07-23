import { DataTypes, Model, Sequelize } from "sequelize";
import Product from "./Product";

class DeliveryCost extends Model {
  public readonly id!: number;

  //DeliveryCost
  public cost!: number;

  public readonly createdAt!: Date;
  public readonly updateAt!: Date;
  public readonly deletedAt!: Date;
  addProduct: any;

  public static initialize(sequelize: Sequelize) {
    DeliveryCost.init(
      {
        cost: {
          type: DataTypes.INTEGER,
        },
      },
      {
        sequelize,
        modelName: "DeliveryCost",
        tableName: "delivery_cost",
        timestamps: true,
        underscored: true,
        paranoid: true,
      }
    );
  }

  static associate({}: {}) {
    DeliveryCost.hasMany(Product, {
      as: "Product",
      foreignKey: "deliveryCostId",
    });
  }
}

export default DeliveryCost;
