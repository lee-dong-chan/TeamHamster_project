import { DataTypes, Model, Sequelize } from "sequelize";
import Store from "./Store";

type Constructor<T> = new (...args: any[]) => T;

class PointHistory extends Model {
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
  //
  // public point!:number;
  public history!: string;

  public readonly storeeId!: number;

  public readonly createdAt!: Date;
  public readonly updateAt!: Date;
  public readonly deletedAt!: Date;
  // addChildren: any;

  public static initialize(sequelize: Sequelize) {
    PointHistory.init(
      {
        point: {
          type: DataTypes.INTEGER,
          // defaultValue: 0,
          allowNull: false,
        },
        history: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "PointHistory",
        tableName: "point_history",
        timestamps: true,
        underscored: true,
        paranoid: true,
      }
    );
  }

  static associate({}: {}) {
    PointHistory.belongsTo(Store, {
      as: "Store",
      foreignKey: "storeId",
    });
  }
}

export default PointHistory;
