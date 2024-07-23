import { DataTypes, Model, Sequelize } from "sequelize";
import ExtraAddress from "./ExtraAddress";
import User from "./User";

class Name extends Model {
  public readonly id!: number;

  //Name
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updateAt!: Date;
  public readonly deletedAt!: Date;
  addExtraAddress: any;
  addUser: any;

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
    Name.hasMany(User, {
      as: "User",
      foreignKey: "nameId",
    });
  }
}

export default Name;
