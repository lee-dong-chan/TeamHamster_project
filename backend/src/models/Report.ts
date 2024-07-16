import { DataTypes, Model, Sequelize } from "sequelize";
import Store from "./Store";
import Product from "./Product";
import ExtraAddress from "./ExtraAddress";

type Constructor<T> = new (...args: any[]) => T;

class Report extends Model {
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

  //Report
  public reportText!: string;
  // public productId!: number;
  public readonly createdAt!: Date;
  public readonly updateAt!: Date;
  public readonly deletedAt!: Date;
  // addChildren: any;

  public static initialize(sequelize: Sequelize) {
    Report.init(
      {
        reportText: {
          type: DataTypes.STRING(500),
        },
      },
      {
        sequelize,
        modelName: "Report",
        tableName: "report",
        timestamps: true,
        underscored: true,
        paranoid: true,
      }
    );
  }

  static associate({}: {}) {
    Report.belongsTo(Product, {
      as: "Product",
      foreignKey: "productId",
    });
    Report.belongsTo(Store, {
      as: "Store",
      foreignKey: "adminId",
    });
  }
}

export default Report;
