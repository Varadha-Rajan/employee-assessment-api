
import Question from "../model/question.model.js";

const create = async (params) => {
    try {
        const result = await Question.create(params);

        return {
            status: 1001,
            code: 1,
            data: result,
            Desc: "Question created successfully"
        };
    } catch (error) {
        return {
            status: 10,
            code: 0,
            error
        };
    }
};

const findAll = async (options = {}) => {
    try {
        const result = await Question.findAndCountAll(options);

        return {
            status: 1000,
            code: 1,
            data: result.rows,
            count: result.count,
            Desc: "Questions fetched successfully"
        };
    } catch (error) {
        return {
            status: 10,
            code: 0,
            error
        };
    }
};

const findById = async (id) => {
    try {
        const result = await Question.findByPk(id);

        if (!result) {
            return {
                status: 1,
                code: 0,
                Desc: "Question not found"
            };
        }

        return {
            status: 1000,
            code: 1,
            data: result,
            Desc: "Question fetched successfully"
        };
    } catch (error) {
        return {
            status: 10,
            code: 0,
            error
        };
    }
};

const update = async (id, params) => {
    try {
        const [updatedCount] = await Question.update(params, {
            where: { id }
        });

        if (updatedCount === 0) {
            return {
                status: 1,
                code: 0,
                Desc: "Question not found"
            };
        }

        const result = await Question.findByPk(id);

        return {
            status: 1003,
            code: 1,
            data: result,
            Desc: "Question updated successfully"
        };
    } catch (error) {
        return {
            status: 10,
            code: 0,
            error
        };
    }
};

const remove = async (id) => {
    try {
        const result = await Question.findByPk(id);

        if (!result) {
            return {
                status: 1,
                code: 0,
                Desc: "Question not found"
            };
        }

        await result.destroy();

        return {
            status: 1004,
            code: 1,
            data: result,
            Desc: "Question deleted successfully"
        };
    } catch (error) {
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
    findById,
    update,
    remove
};
