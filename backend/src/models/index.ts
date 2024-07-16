import { Sequelize, Options } from "sequelize";
import mysqlConfig from "../../config/config.json";
import Category from "./Category";
import Product from "./Product";
import Store from "./Store";
import User from "./User";
import PointHistory from "./PointHistory";
import Review from "./Review";
import ExtraAddress from "./ExtraAddress";
import Address from "./Address";
import Name from "./Name";
import Report from "./Report";
import DeliveryCost from "./DeliveryCost";

const config: Options = mysqlConfig.development as Options;

export const sequelize = new Sequelize(config);
Category.initialize(sequelize);
Product.initialize(sequelize);
Store.initialize(sequelize);
User.initialize(sequelize);
PointHistory.initialize(sequelize);
Review.initialize(sequelize);
ExtraAddress.initialize(sequelize);
Address.initialize(sequelize);
Name.initialize(sequelize);
Report.initialize(sequelize);
DeliveryCost.initialize(sequelize);

Category.associate({ Product, Category });
Product.associate({ Category, Store, Review });
Store.associate({ User, Product, PointHistory, Review, ExtraAddress });
User.associate({ Store });
// PointHistory.associate({ Store });
// Review.associate({ Store });
ExtraAddress.associate({ Product });
Address.associate({ ExtraAddress });
Name.associate({ ExtraAddress });
DeliveryCost.associate({ Product });

export {
  Category,
  Product,
  Store,
  User,
  PointHistory,
  Review,
  ExtraAddress,
  Address,
  Name,
  Report,
  DeliveryCost,
};
