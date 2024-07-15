import { DataTypes, Model, Sequelize } from "sequelize";
import Store from "./Store";
import Product from "./Product";
import Address from "./Address";
import Name from "./Name";

type Constructor<T> = new (...args: any[]) => T;

class ExtraAddress extends Model {
  public readonly id!: number;

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

  //ExtraAddress
  public detailAddress!: string;

  public readonly storeeId!: number;

  public readonly createdAt!: Date;
  public readonly updateAt!: Date;
  public readonly deletedAt!: Date;
  // addChildren: any;

  public static initialize(sequelize: Sequelize) {
    ExtraAddress.init(
      {
        mobile: {
          type: DataTypes.STRING(11),
          // defaultValue: 0,
          allowNull: false,
        },
        detailAddress: {
          type: DataTypes.STRING(200),
        },
      },
      {
        sequelize,
        modelName: "ExtraAddress",
        tableName: "extra_address",
        timestamps: true,
        underscored: true,
        paranoid: true,
      }
    );
  }

  static associate({}: {}) {
    ExtraAddress.belongsTo(Store, {
      as: "Store",
      foreignKey: "storeId",
    });
    ExtraAddress.belongsTo(Address, {
      as: "Address",
      foreignKey: "addressId",
    });
    ExtraAddress.belongsTo(Name, {
      as: "Name",
      foreignKey: "nameId",
    });
    ExtraAddress.hasMany(Product, {
      as: "SellAddress",
      foreignKey: "sellAddressId",
    });
    ExtraAddress.hasMany(Product, {
      as: "PurchaseAddress",
      foreignKey: "purchaseAddressId",
    });
  }
}

export default ExtraAddress;
