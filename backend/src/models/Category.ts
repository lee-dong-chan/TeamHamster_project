import { DataTypes, Model, Sequelize } from "sequelize";
import Product from "./Product";

type Constructor<T> = new (...args: any[]) => T;

class Category extends Model {
  public readonly id!: number;
  public name!: string;
  public preCateId!: number;
  public readonly createdAt!: Date;
  public readonly updateAt!: Date;
  public readonly deletedAt!: Date;
  addChildren: any;
  addProduct: any;

  public static initialize(sequelize: Sequelize) {
    Category.init(
      {
        name: {
          type: DataTypes.STRING(100),
        },
        preCateId: {
          type: DataTypes.INTEGER,
        },
      },
      {
        sequelize,
        modelName: "Category",
        tableName: "category",
        timestamps: true,
        underscored: true,
        paranoid: true,
      }
    );
  }
  static associate({}: {}) {
    Category.hasMany(Category, {
      as: "Children",
      foreignKey: "preCateId",
    });
    Category.belongsTo(Category, {
      as: "Parent",
      foreignKey: "preCateId",
    });
    Category.hasMany(Product, {
      as: "Product",
      foreignKey: "categoryId",
    });
  }
}

export default Category;
