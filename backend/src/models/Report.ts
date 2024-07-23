import { DataTypes, Model, Sequelize } from "sequelize";
import Store from "./Store";
import Product from "./Product";

class Report extends Model {
  public readonly id!: number;

  //Report
  public reportText!: string;
  public readonly createdAt!: Date;
  public readonly updateAt!: Date;
  public readonly deletedAt!: Date;

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
