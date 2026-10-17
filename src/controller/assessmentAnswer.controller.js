
import service from "../service/assessmentAnswer.service.js";
import sendResponse from "../utils/sendResponse.js";

const create = async (req, res) => {
    const requestId = `${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}`;

    try {
        const result = await service.create(req.body);

        if (!("code" in result) || result.code === 0) {
            const error = new Error(
                result?.Desc || "Service returned invalid request"
            );

            Object.assign(error, { custom: result });
            throw error;
        }

        return sendResponse(res, result.status, result.data, {
            message: result.Desc
        });
    } catch (error) {
        console.error("Assessment answer create controller error:", {
            requestId,
            error: error.message
        });

        return sendResponse(
            res,
            error?.custom?.status || 5,
            null,
            {
                message:
                    error?.custom?.Desc ||
                    error?.custom?.message ||
                    "Something went wrong.",
                details: error?.custom?.error?.message || null
            }
        );
    }
};

const findAll = async (req, res) => {
    const requestId = `${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}`;

    try {
        const result = await service.findAll(req.body || {});

        if (!("code" in result) || result.code === 0) {
            const error = new Error(
                result?.Desc || "Service returned invalid request"
            );

            Object.assign(error, { custom: result });
            throw error;
        }

        return sendResponse(res, result.status, result.data, {
            message: result.Desc,
            additional: {
                count: result.count,
                page: result.page,
                limit: result.limit,
                totalPages: result.totalPages
            }
        });
    } catch (error) {
        console.error("Assessment answer list controller error:", {
            requestId,
            error: error.message
        });

        return sendResponse(
            res,
            error?.custom?.status || 5,
            null,
            {
                message:
                    error?.custom?.Desc ||
                    error?.custom?.message ||
                    "Something went wrong.",
                details: error?.custom?.error?.message || null
            }
        );
    }
};

const findById = async (req, res) => {
    const requestId = `${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}`;

    try {
        const result = await service.findById(req.params.id);

        if (!("code" in result) || result.code === 0) {
            const error = new Error(
                result?.Desc || "Service returned invalid request"
            );

            Object.assign(error, { custom: result });
            throw error;
        }

        return sendResponse(res, result.status, result.data, {
            message: result.Desc
        });
    } catch (error) {
        console.error("Assessment answer find controller error:", {
            requestId,
            error: error.message
        });

        return sendResponse(
            res,
            error?.custom?.status || 5,
            null,
            {
                message:
                    error?.custom?.Desc ||
                    error?.custom?.message ||
                    "Something went wrong.",
                details: error?.custom?.error?.message || null
            }
        );
    }
};

export default {
    create,
    findAll,
    findById
};
