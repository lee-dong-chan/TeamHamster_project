import { DataTypes, Model, Sequelize } from "sequelize";
import Store from "./Store";
import Product from "./Product";
import Address from "./Address";
import Name from "./Name";

class ExtraAddress extends Model {
  public readonly id!: number;

  //ExtraAddress
  public mobile!: string;
  public detailAddress!: string;

  public readonly createdAt!: Date;
  public readonly updateAt!: Date;
  public readonly deletedAt!: Date;
  addSellAddress: any;
  addPurchaseAddress: any;

  public static initialize(sequelize: Sequelize) {
    ExtraAddress.init(
      {
        mobile: {
          type: DataTypes.STRING(11),
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
