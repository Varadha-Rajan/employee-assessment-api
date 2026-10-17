
import AssessmentAnswer from "../model/assessmentAnswer.model.js";

const create = async (data) => {
    try {
        const result = await AssessmentAnswer.create(data);

        return {
            status: 1001,
            code: 1,
            data: result,
            Desc: "Assessment answer submitted successfully"
        };
    } catch (error) {
        console.error("Assessment answer create repository error:", error);

        return {
            status: 10,
            code: 0,
            error
        };
    }
};

const findAll = async (params = {}) => {
    try {
        const page = Math.max(1, Number(params.page) || 1);
        const limit = Math.min(
            100,
            Math.max(1, Number(params.limit) || 10)
        );

        const where = {};

        if (params.assessmentId) {
            where.assessmentId = params.assessmentId;
        }

        if (params.employeeId) {
            where.employeeId = params.employeeId;
        }

        const result = await AssessmentAnswer.findAndCountAll({
            where,
            limit,
            offset: (page - 1) * limit,
            order: [["createdAt", "DESC"]]
        });

        return {
            status: 1000,
            code: 1,
            data: result.rows,
            count: result.count,
            page,
            limit,
            totalPages: Math.ceil(result.count / limit),
            Desc: "Assessment submissions fetched successfully"
        };
    } catch (error) {
        console.error("Assessment answer list repository error:", error);

        return {
            status: 10,
            code: 0,
            error
        };
    }
};

const findById = async (id) => {
    try {
        const result = await AssessmentAnswer.findByPk(id);

        if (!result) {
            return {
                status: 1,
                code: 0,
                Desc: "Assessment submission not found"
            };
        }

        return {
            status: 1000,
            code: 1,
            data: result,
            Desc: "Assessment submission fetched successfully"
        };
    } catch (error) {
        console.error("Assessment answer find repository error:", error);

        return {
            status: 10,
            code: 0,
            error
        };
    }
};

export default {
    create,
    findAll,
    findById
};
