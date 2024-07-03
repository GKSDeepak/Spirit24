import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const opinion = sequelize.define(
  "Opinion",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
);

export default opinion;