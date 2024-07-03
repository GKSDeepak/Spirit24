import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import argon2 from "argon2";

const User = sequelize.define(
  "User",
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
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    college: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    points: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    firstLogin: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        const hashedPassword = await argon2.hash(user.password);
        user.password = hashedPassword;
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          const hashedPassword = await argon2.hash(user.password);
          user.password = hashedPassword;
        }
      },
    },
  }
);

export default User;