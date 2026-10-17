
import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const Question = sequelize.define(
    "Question",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        assessmentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "assessment_id",
            references: {
                model: "assessments",
                key: "id"
            }
        },
        question: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        questionType: {
            type: DataTypes.STRING(30),
            allowNull: false,
            defaultValue: "multiple_choice",
            field: "question_type"
        },
        options: {
            type: DataTypes.JSONB,
            allowNull: true
        },
        correctAnswer: {
            type: DataTypes.STRING(500),
            allowNull: true,
            field: "correct_answer"
        },
        marks: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        tableName: "questions",
        timestamps: true,
        underscored: true
    }
);

export default Question;
