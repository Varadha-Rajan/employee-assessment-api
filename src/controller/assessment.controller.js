
import service from "../service/assessment.service.js";
import sendResponse from "../utils/sendResponse.js";

const create = async (req, res, next) => {
    const requestId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    try {
        let payload = req.body;
        const result = await service.create(payload);

        if (!("code" in result) || result?.code == 0) {
            const err = new Error("Service returned invalid request");
            Object.assign(err, { custom: result });
            throw err;
        }

        return sendResponse(
            res,
            result?.status,
            result?.data,
            {
                message: result?.message
            }
        );
    } catch (error) {
        console.log(
            `\x1b[43m\x1b[30m📍 ${requestId}\x1b[0m 🚀 Error`,
            error
        );

        return sendResponse(
            res,
            error?.custom?.status || 5,
            null,
            {
                message: error?.custom?.Desc || error?.custom?.message || "Something went wrong.",
                details: error?.custom?.error?.message || null
            }
        );
    }
};

const findAll = async (req, res, next) => {
    const requestId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    try {
        const result = await service.findAll(req.body);

        if (!("code" in result) || result?.code == 0) {
            const err = new Error("Service returned invalid request");
            Object.assign(err, { custom: result });
            throw err;
        }

        return sendResponse(
            res,
            result?.status,
            result?.data,
            {
                message: result?.Desc || result?.message,
                additional: {
                    count: result?.count,
                    page: result?.page,
                    limit: result?.limit,
                    totalPages: result?.totalPages
                }
            }
        );
    } catch (error) {
        console.log(
            `\x1b[43m\x1b[30m📍 ${requestId}\x1b[0m 🚀 Error`,
            error
        );

        return sendResponse(
            res,
            error?.custom?.status || 5,
            null,
            {
                message: error?.custom?.message || "Something went wrong.",
                details: error?.custom?.error?.message || null
            }
        );
    }
};


const findById = async (req, res, next) => {
    const requestId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    try {
        const id = req.params.id;
        const result = await service.findById(id);

        if (!("code" in result) || result?.code == 0) {
            const err = new Error(
                result?.Desc || "Service returned invalid request"
            );

            Object.assign(err, { custom: result });
            throw err;
        }

        return sendResponse(
            res,
            result?.status,
            result?.data,
            {
                message: result?.Desc
            }
        );
    } catch (error) {
        console.log(
            `\x1b[43m\x1b[30m📍 ${requestId}\x1b[0m 🚀 Error`,
            error
        );

        return sendResponse(
            res,
            error?.custom?.status || 5,
            null,
            {
                message:
                    error?.custom?.Desc || "Something went wrong.",
                details: error?.custom?.error?.message || null
            }
        );
    }
};


const update = async (req, res, next) => {
    const requestId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    try {
        const id = req.params.id;
        const payload = req.body;

        const result = await service.update(id, payload);

        if (!("code" in result) || result?.code == 0) {
            const err = new Error("Service returned invalid request");
            Object.assign(err, { custom: result });
            throw err;
        }

        return sendResponse(
            res,
            result?.status,
            result?.data,
            {
                message: result?.message
            }
        );
    } catch (error) {
        console.log(
            `\x1b[43m\x1b[30m📍 ${requestId}\x1b[0m 🚀 Error`,
            error
        );

        return sendResponse(
            res,
            error?.custom?.status || 5,
            null,
            {
                message: error?.custom?.message || "Something went wrong.",
                details: error?.custom?.error?.message || null
            }
        );
    }
};

const remove = async (req, res, next) => {
    const requestId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    try {
        const id = req.params.id;
        const result = await service.remove(id);

        if (!("code" in result) || result?.code == 0) {
            const err = new Error("Service returned invalid request");
            Object.assign(err, { custom: result });
            throw err;
        }

        return sendResponse(
            res,
            result?.status,
            result?.data,
            {
                message: result?.message
            }
        );
    } catch (error) {
        console.log(
            `\x1b[43m\x1b[30m📍 ${requestId}\x1b[0m 🚀 Error`,
            error
        );

        return sendResponse(
            res,
            error?.custom?.status || 5,
            null,
            {
                message: error?.custom?.message || "Something went wrong.",
                details: error?.custom?.error?.message || null
            }
        );
    }
};

export default {
    create,
    findAll,
    findById,
    update,
    remove
};
