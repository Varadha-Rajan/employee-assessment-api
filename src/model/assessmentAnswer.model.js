
import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const AssessmentAnswer = sequelize.define(
    "AssessmentAnswer",
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

        employeeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "employee_id"
        },

        attemptNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "attempt_number"
        },

        answers: {
            type: DataTypes.JSONB,
            allowNull: false,
            defaultValue: [],
        },

        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },

        totalMarks: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "total_marks"
        },

        percentage: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: false,
            defaultValue: 0
        },

        submittedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: "submitted_at"
        }
    },
    {
        tableName: "assessment_answers",
        timestamps: true,
        underscored: true
    }
);

export default AssessmentAnswer;
