
import db from "../repository/question.repository.js";

const create = async (params) => {
    try {
        if (!Number.isInteger(params?.assessmentId) || params.assessmentId <= 0) {
            return {
                status: 2,
                code: 0,
                Desc: "Valid assessmentId is required"
            };
        }

        if (!params.question || typeof params.question !== "string" || !params.question.trim()) {
            return {
                status: 2,
                code: 0,
                Desc: "Question is required"
            };
        }

        if (params.marks !== undefined &&
            (!Number.isInteger(params.marks) || params.marks <= 0)) {
            return {
                status: 2,
                code: 0,
                Desc: "Marks must be a positive integer"
            };
        }

        const result = await db.create(params);
        return result;
    } catch (error) {
        return error;
    }
};

const findAll = async (params = {}) => {
    try {
        const page = Math.max(1, parseInt(params.page, 10) || 1);
        const limit = Math.min(100, Math.max(1, parseInt(params.limit, 10) || 10));
        const offset = (page - 1) * limit;

        const options = {
            limit,
            offset,
            order: [["id", "DESC"]]
        };

        if (params.assessmentId !== undefined) {
            const assessmentId = Number(params.assessmentId);

            if (!Number.isInteger(assessmentId) || assessmentId <= 0) {
                return {
                    status: 2,
                    code: 0,
                    Desc: "Valid assessmentId is required"
                };
            }

            options.where = { assessmentId };
        }

        const result = await db.findAll(options);

        if (result.code === 0) return result;

        const totalPages = Math.ceil(result.count / limit);

        return {
            ...result,
            additional: {
                count: result.count,
                page,
                limit,
                totalPages
            }
        };
    } catch (error) {
        return error;
    }
};

const findById = async (id) => {
    try {
        const questionId = Number(id);

        if (!Number.isInteger(questionId) || questionId <= 0) {
            return {
                status: 2,
                code: 0,
                Desc: "Valid question ID is required"
            };
        }

        return await db.findById(questionId);
    } catch (error) {
        return error;
    }
};

const update = async (id, params) => {
    try {
        const questionId = Number(id);

        if (!Number.isInteger(questionId) || questionId <= 0) {
            return {
                status: 2,
                code: 0,
                Desc: "Valid question ID is required"
            };
        }

        if (params.assessmentId !== undefined &&
            (!Number.isInteger(params.assessmentId) || params.assessmentId <= 0)) {
            return {
                status: 2,
                code: 0,
                Desc: "Valid assessmentId is required"
            };
        }

        if (params.question !== undefined &&
            (typeof params.question !== "string" || !params.question.trim())) {
            return {
                status: 2,
                code: 0,
                Desc: "Question cannot be empty"
            };
        }

        if (params.marks !== undefined &&
            (!Number.isInteger(params.marks) || params.marks <= 0)) {
            return {
                status: 2,
                code: 0,
                Desc: "Marks must be a positive integer"
            };
        }

        return await db.update(questionId, params);
    } catch (error) {
        return error;
    }
};

const remove = async (id) => {
    try {
        const questionId = Number(id);

        if (!Number.isInteger(questionId) || questionId <= 0) {
            return {
                status: 2,
                code: 0,
                Desc: "Valid question ID is required"
            };
        }

        return await db.remove(questionId);
    } catch (error) {
        return error;
    }
};

export default { create, findAll, findById, update, remove };
