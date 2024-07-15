import { DataTypes, Model, Sequelize } from "sequelize";
import Store from "./Store";
import Product from "./Product";
import ExtraAddress from "./ExtraAddress";

type Constructor<T> = new (...args: any[]) => T;

class DeliveryCost extends Model {
  public readonly id!: number;

  // //User
  // public email!: string;
  // public password!: string;
  // public mobile!: string;
  // public delivery!: boolean;
  // public admin!: boolean;
  // public Oauth!: string;

  // //Store
  // public nick!: string;
  // public point!: number;
  // public introduction!: string;
  // public report_point!: number;
  // // public mobile!: string;
  // public block!: boolean;

  //DeliveryCost
  public cost!: number;

  public readonly addressId!: number;

  public readonly createdAt!: Date;
  public readonly updateAt!: Date;
  public readonly deletedAt!: Date;
  // addChildren: any;

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
