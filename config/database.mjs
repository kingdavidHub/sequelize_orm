import { Sequelize } from "sequelize";

const env = process.env.NODE_ENV || 'development';

import config from "./config.mjs";

const sequelize = new Sequelize(config[env]);
export default sequelize;