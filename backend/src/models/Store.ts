import { DataTypes, Model, Sequelize } from "sequelize";
import User from "./User";
import Product from "./Product";
import PointHistory from "./PointHistory";
import Review from "./Review";
import ExtraAddress from "./ExtraAddress";
import Report from "./Report";

type Constructor<T> = new (...args: any[]) => T;

class Store extends Model {
  public readonly id!: number;
  //Category
  public name!: string;
  public preCateId!: number;
  //User
  public email!: string;
  public password!: string;
  public mobile!: string;
  public delivery!: boolean;
  public admin!: boolean;
  public Oauth!: string;
  //Store
  public nick!: string;
  public point!: number;
  public introduction!: string;
  public report_point!: number;
  // public mobile!: string;
  public block!: boolean;

  public readonly userId!: number;

  public readonly createdAt!: Date;
  public readonly updateAt!: Date;
  public readonly deletedAt!: Date;
  addChildren: any;

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
      as: "Product",
      foreignKey: "storeId",
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
      foreignKey: "storeId",
    });
  }
}

export default Store;
