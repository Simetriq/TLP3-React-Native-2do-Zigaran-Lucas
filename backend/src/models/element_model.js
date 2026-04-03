import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const ElementModel = sequelize.define(
  "element",
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "name"
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "description"
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: "type"
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: "quantity"
    },
  },
  {
    underscored: true,
    // paranoid: true,
  }
);