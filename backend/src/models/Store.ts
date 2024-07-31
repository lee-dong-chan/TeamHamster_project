import { DataTypes, Model, Sequelize } from "sequelize";
import User from "./User";
import Product from "./Product";
import PointHistory from "./PointHistory";
import Review from "./Review";
import ExtraAddress from "./ExtraAddress";
import Report from "./Report";

class Store extends Model {
  public readonly id!: number;
  public nick!: string;
  public point!: number;
  public introduction!: string;
  public report_point!: number;
  public mobile!: string;
  public block!: boolean;
  public star!: number;

  public readonly createdAt!: Date;
  public readonly updateAt!: Date;
  public readonly deletedAt!: Date;
  addExtraAddress: any;
  addSell: any;
  addPurchase: any;
  addReview: any;
  addPointHistory: any;
  addReport: any;

  public static initialize(sequelize: Sequelize) {
    Store.init(
      {
        nick: {
          type: DataTypes.STRING(100),
          unique: true,
          allowNull: false,
        },
        point: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
        introduction: {
          type: DataTypes.STRING(500),
        },
        report_point: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
        mobile: {
          type: DataTypes.STRING(11),
        },
        block: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        profileimg: {
          type: DataTypes.TEXT,
          defaultValue: "hamster.png",
        },
      },
      {
        sequelize,
        modelName: "Store",
        tableName: "store",
        timestamps: true,
        underscored: true,
        paranoid: true,
      }
    );
  }
  static associate({}: {}) {
    Store.belongsTo(User, {
      as: "User",
      foreignKey: "userId",
    });
    Store.hasMany(Product, {
      as: "Sell",
      foreignKey: "sellId",
    });
    Store.hasMany(Product, {
      as: "Purchase",
      foreignKey: "purchaseId",
    });
    Store.hasMany(PointHistory, {
      as: "PointHistory",
      foreignKey: "storeId",
    });
    Store.hasMany(Review, {
      as: "Review",
      foreignKey: "storeId",
    });
    Store.hasMany(ExtraAddress, {
      as: "ExtraAddress",
      foreignKey: "storeId",
    });
    Store.hasMany(Report, {
      as: "Report",
      foreignKey: "adminId",
    });
  }
}

export default Store;
