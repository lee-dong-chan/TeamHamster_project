import { DataTypes, Model, Sequelize } from "sequelize";
import ExtraAddress from "./ExtraAddress";

class Address extends Model {
  public readonly id!: number;

  //Address
  public address!: string;

  public readonly createdAt!: Date;
  public readonly updateAt!: Date;
  public readonly deletedAt!: Date;
  addExtraAddress: any;

  public static initialize(sequelize: Sequelize) {
    Address.init(
      {
        address: {
          type: DataTypes.STRING(200),
          unique: true,
        },
      },
      {
        sequelize,
        modelName: "Address",
        tableName: "address",
        timestamps: true,
        underscored: true,
        paranoid: true,
      }
    );
  }

  static associate({}: {}) {
    Address.hasMany(ExtraAddress, {
      as: "ExtraAddress",
      foreignKey: "addressId",
    });
  }
}

export default Address;
