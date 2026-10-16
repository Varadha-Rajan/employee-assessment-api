import Assessment from "../model/assessment.model.js";

const create = async (params) => {
    try {
        const result = await Assessment.create(params);

        return {
            status: 1001,
            code: 1,
            data: result,
            Desc: "Assessment created successfully"
        };
    } catch (error) {
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
        const offset = (page - 1) * limit;

        const where = {};

        if (params.status !== undefined) {
            where.status = params.status;
        }

        if (params.search && params.search.trim()) {
            const { Op } = await import("sequelize");

            where.title = {
                [Op.iLike]: `%${params.search.trim()}%`
            };
        }

        const result = await Assessment.findAndCountAll({
            where,
            limit,
            offset,
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
            Desc: "Assessments fetched successfully"
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

        const result = await Assessment.findByPk(id);

        if (!result) {
            return {
                status: 1,
                code: 0,
                Desc: "Assessment not found"
            };
        }

        return {
            status: 1000,
            code: 1,
            data: result,
            Desc: "Assessment fetched successfully"
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
        const [updatedCount] = await Assessment.update(params, {
            where: { id }
        });

        if (updatedCount === 0) {
            return {
                status: 1,
                code: 0,
                Desc: "Assessment not found"
            };
        }

        const result = await Assessment.findByPk(id);

        return {
            status: 1003,
            code: 1,
            data: result,
            Desc: "Assessment updated successfully"
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
        const result = await Assessment.findByPk(id);

        if (!result) {
            return {
                status: 1,
                code: 0,
                Desc: "Assessment not found"
            };
        }

        await result.destroy();

        return {
            status: 1004,
            code: 1,
            data: result,
            Desc: "Assessment deleted successfully"
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
