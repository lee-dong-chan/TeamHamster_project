import { DataTypes, Model, Sequelize } from "sequelize";
import Category from "./Category";
import Store from "./Store";
import Review from "./Review";
import Report from "./Report";
import DeliveryCost from "./DeliveryCost";
import ExtraAddress from "./ExtraAddress";

class Product extends Model {
  public readonly id!: number;
  //category
  public name!: string;
  public preCateId!: number;

  public title!: string;
  public discription!: string;
  public itemState!: string;
  public price!: number;
  public img!: string;
  public image!: string[];
  public userCheck!: boolean;
  public sellId!: number;
  public readonly createdAt!: Date;
  public readonly updateAt!: Date;
  public readonly deletedAt!: Date;
  addReport: any;
  addReview: any;
  addDeliveryCost: any;

  public static initialize(sequelize: Sequelize) {
    Product.init(
      {
        title: {
          type: DataTypes.STRING(48),
          allowNull: false,
        },
        discription: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        itemState: {
          type: DataTypes.STRING(5),
          defaultValue: "판매중",
        },
        price: {
          type: DataTypes.INTEGER,
        },
        img: {
          type: DataTypes.TEXT,
        },
        delivery: {
          type: DataTypes.INTEGER,
        },
        userCheck: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
      },
      {
        sequelize,
        modelName: "Product",
        tableName: "product",
        timestamps: true,
        underscored: true,
        paranoid: true,
      }
    );
  }
  static associate({}: {}) {
    Product.hasMany(Review, {
      as: "Review",
      foreignKey: "productId",
    });
    Product.hasMany(Report, {
      as: "Report",
      foreignKey: "productId",
    });
    Product.belongsTo(Category, {
      as: "Category",
      foreignKey: "categoryId",
    });
    Product.belongsTo(Store, {
      as: "Sell",
      foreignKey: "sellId",
    });
    Product.belongsTo(Store, {
      as: "Purchase",
      foreignKey: "purchaseId",
    });
    Product.belongsTo(DeliveryCost, {
      as: "DeliveryCost",
      foreignKey: "deliveryCostId",
    });
    Product.belongsTo(ExtraAddress, {
      as: "SellAddress",
      foreignKey: "sellAddressId",
    });
    Product.belongsTo(ExtraAddress, {
      as: "PurchaseAddress",
      foreignKey: "purchaseAddressId",
    });
  }
}

export default Product;
