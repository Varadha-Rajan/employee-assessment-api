
import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const Assessment = sequelize.define(
    "Assessment",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        totalMarks: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 100,
            field: "total_marks"
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        tableName: "assessments",
        timestamps: true,
        underscored: true
    }
);

export default Assessment;
