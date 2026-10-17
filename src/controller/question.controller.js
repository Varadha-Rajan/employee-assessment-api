
import service from "../service/question.service.js";
import sendResponse from "../utils/sendResponse.js";

const create = async (req, res) => {
    const requestId = `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;

    try {
        const result = await service.create(req.body);

        if (!("code" in result) || result.code === 0) {
            const err = new Error(result.Desc || "Service returned invalid request");
            Object.assign(err, { custom: result });
            throw err;
        }

        return sendResponse(res, result.status, result.data, {
            message: result.Desc
        });
    } catch (error) {
        console.log(`[${requestId}] Create question error`, error);

        return sendResponse(
            res,
            error.custom?.status || 5,
            null,
            {
                message: error.custom?.Desc || "Something went wrong.",
                details: error.custom?.error?.message || null
            }
        );
    }
};

const findAll = async (req, res) => {
    const requestId = `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;

    try {
        const result = await service.findAll(req.body);

        if (!("code" in result) || result.code === 0) {
            const err = new Error(result.Desc || "Service returned invalid request");
            Object.assign(err, { custom: result });
            throw err;
        }

        return sendResponse(res, result.status, result.data, {
            message: result.Desc,
            additional: result.additional
        });
    } catch (error) {
        console.log(`[${requestId}] List questions error`, error);

        return sendResponse(
            res,
            error.custom?.status || 5,
            null,
            {
                message: error.custom?.Desc || "Something went wrong.",
                details: error.custom?.error?.message || null
            }
        );
    }
};

const findById = async (req, res) => {
    const requestId = `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;

    try {
        const result = await service.findById(req.params.id);

        if (!("code" in result) || result.code === 0) {
            const err = new Error(result.Desc || "Service returned invalid request");
            Object.assign(err, { custom: result });
            throw err;
        }

        return sendResponse(res, result.status, result.data, {
            message: result.Desc
        });
    } catch (error) {
        console.log(`[${requestId}] Get question error`, error);

        return sendResponse(
            res,
            error.custom?.status || 5,
            null,
            {
                message: error.custom?.Desc || "Something went wrong.",
                details: error.custom?.error?.message || null
            }
        );
    }
};

const update = async (req, res) => {
    const requestId = `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;

    try {
        const result = await service.update(req.params.id, req.body);

        if (!("code" in result) || result.code === 0) {
            const err = new Error(result.Desc || "Service returned invalid request");
            Object.assign(err, { custom: result });
            throw err;
        }

        return sendResponse(res, result.status, result.data, {
            message: result.Desc
        });
    } catch (error) {
        console.log(`[${requestId}] Update question error`, error);

        return sendResponse(
            res,
            error.custom?.status || 5,
            null,
            {
                message: error.custom?.Desc || "Something went wrong.",
                details: error.custom?.error?.message || null
            }
        );
    }
};

const remove = async (req, res) => {
    const requestId = `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;

    try {
        const result = await service.remove(req.params.id);

        if (!("code" in result) || result.code === 0) {
            const err = new Error(result.Desc || "Service returned invalid request");
            Object.assign(err, { custom: result });
            throw err;
        }

        return sendResponse(res, result.status, result.data, {
            message: result.Desc
        });
    } catch (error) {
        console.log(`[${requestId}] Delete question error`, error);

        return sendResponse(
            res,
            error.custom?.status || 5,
            null,
            {
                message: error.custom?.Desc || "Something went wrong.",
                details: error.custom?.error?.message || null
            }
        );
    }
};

export default { create, findAll, findById, update, remove };
