import { DataTypes, Model, Sequelize } from "sequelize";
import Store from "./Store";
import Name from "./Name";

type Constructor<T> = new (...args: any[]) => T;

class User extends Model {
  public readonly id!: number;
  public email!: string;
  public password!: string;
  public mobile!: string;
  public delivery!: boolean;
  public admin!: boolean;
  public Oauth!: string;

  public readonly createdAt!: Date;
  public readonly updateAt!: Date;
  public readonly deletedAt!: Date;
  setStore: any;
  nameId: number | undefined;

  public static initialize(sequelize: Sequelize) {
    User.init(
      {
        email: {
          type: DataTypes.STRING(100),
          unique: true,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING(128),
        },
        mobile: {
          type: DataTypes.STRING(11),
        },
        delivery: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        admin: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        Oauth: {
          type: DataTypes.STRING(3),
          defaultValue: "햄스터",
        },
      },
      {
        sequelize,
        modelName: "User",
        tableName: "user",
        timestamps: true,
        underscored: true,
        paranoid: true,
      }
    );
  }
  static associate({}: {}) {
    User.hasOne(Store, {
      as: "Store",
      foreignKey: "userId",
    });
    User.belongsTo(Name, {
      as: "Name",
      foreignKey: "nameId",
    });
  }
}

export default User;
