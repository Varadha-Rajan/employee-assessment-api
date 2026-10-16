
import { descriptions, fieldNames } from "./message.js";

const sendResponse = (res, actionCode, data = null, options = {}) => {
    const messageInfo = descriptions[actionCode];

    if (!messageInfo) {
        throw new Error(`Unknown response action code: ${actionCode}`);
    }

    const isSuccess = messageInfo.response === "PASSED";

    let message = options.message || messageInfo.Desc;

    if (message.includes("<FIELD>")) {
        const field = options.field || "value";
        message = message.replace(
            /<FIELD>/g,
            fieldNames[field] || field
        );
    }

    const body = {
        success: isSuccess,
        action: messageInfo.code,
        actionCode,
        message,
        data: isSuccess ? data : null,
        error: isSuccess
            ? null
            : {
                details: options.details || null
            },
        meta: {
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV || "development",
            pagination: options.pagination || null,
            additional: options.additional || null
        }
    };

    return res.status(messageInfo.status).json(body);
};

export default sendResponse;
