import db from "../repository/assessment.repository.js";


const create = async (params) => {
    try {
        if (
            typeof params?.title !== "string" ||
            !params.title.trim()
        ) {
            return {
                status: 2,
                code: 0,
                Desc: "Assessment title is required."
            };
        }

        if (
            params.totalMarks !== undefined &&
            (!Number.isInteger(params.totalMarks) ||
                params.totalMarks <= 0)
        ) {
            return {
                status: 2,
                code: 0,
                Desc: "Total marks must be a positive integer."
            };
        }

        if (
            params.status !== undefined &&
            typeof params.status !== "boolean"
        ) {
            return {
                status: 2,
                code: 0,
                Desc: "Status must be true or false."
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
        const result = await db.findAll(params);
        return result;
    } catch (error) {
        return error;
    }
};

const findById = async (params) => {
    try {
        const result = await db.findById(params);
        return result;
    } catch (error) {
        return error;
    }
};

const update = async (id, params) => {
    try {
        const result = await db.update(id, params);
        return result;
    } catch (error) {
        return error;
    }
};

const remove = async (params) => {
    try {
        const result = await db.remove(params);
        return result;
    } catch (error) {
        return error;
    }
};

export default {
    create,
    findAll,
    findById,
    update,
    remove
};
