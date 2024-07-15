import { DataTypes, Model, Sequelize } from "sequelize";
import Store from "./Store";
import Product from "./Product";

type Constructor<T> = new (...args: any[]) => T;

class Review extends Model {
  public readonly id!: number;

  //product
  // public title!: string;
  // public discription!: string;
  // public itemState!: string;
  // public price!: number;
  // public prepayment!: boolean;
  // public img!: string;

  // public name!: string;
  // public preCateId!: number;

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

  //review
  public star!: number;
  public reviewContent!: string;

  public readonly categoryId!: number;
  public readonly storeeId!: number;

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
