import { DataTypes, Model, Sequelize } from "sequelize";
import Store from "./Store";

class PointHistory extends Model {
  public readonly id!: number;
  public point!: number;
  public history!: string;

  public readonly createdAt!: Date;
  public readonly updateAt!: Date;
  public readonly deletedAt!: Date;

  public static initialize(sequelize: Sequelize) {
    PointHistory.init(
      {
        point: {
          type: DataTypes.INTEGER,
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
