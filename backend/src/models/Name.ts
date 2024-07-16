import { DataTypes, Model, Sequelize } from "sequelize";
import Store from "./Store";
import Product from "./Product";
import ExtraAddress from "./ExtraAddress";

type Constructor<T> = new (...args: any[]) => T;

class Name extends Model {
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

  //Name
  public name!: string;

  // public readonly nameId!: number;

  public readonly createdAt!: Date;
  public readonly updateAt!: Date;
  public readonly deletedAt!: Date;
  // addChildren: any;

  public static initialize(sequelize: Sequelize) {
    Name.init(
      {
        name: {
          type: DataTypes.STRING(4),
          unique: true,
        },
      },
      {
        sequelize,
        modelName: "Name",
        tableName: "name",
        timestamps: true,
        underscored: true,
        paranoid: true,
      }
    );
  }

  static associate({}: {}) {
    Name.hasMany(ExtraAddress, {
      as: "ExtraAddress",
      foreignKey: "nameId",
    });
  }
}

export default Name;
