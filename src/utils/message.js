
export const descriptions = {
    // Success responses
    1000: {
        code: "SUCCESS",
        status: 200,
        Desc: "Request completed successfully.",
        response: "PASSED"
    },
    1001: {
        code: "CREATED",
        status: 201,
        Desc: "Record created successfully.",
        response: "PASSED"
    },
    1003: {
        code: "UPDATED",
        status: 200,
        Desc: "Record updated successfully.",
        response: "PASSED"
    },
    1004: {
        code: "DELETED",
        status: 200,
        Desc: "Record deleted successfully.",
        response: "PASSED"
    },

    // Error responses
    1: {
        code: "NOT_FOUND",
        status: 404,
        Desc: "<FIELD> not found.",
        response: "FAILED"
    },
    2: {
        code: "VALIDATION_ERROR",
        status: 422,
        Desc: "Please check the provided input.",
        response: "FAILED"
    },
    6: {
        code: "BAD_REQUEST",
        status: 400,
        Desc: "Invalid request.",
        response: "FAILED"
    },
    7: {
        code: "DUPLICATE_RECORD",
        status: 409,
        Desc: "A record with this value already exists.",
        response: "FAILED"
    },
    10: {
        code: "DB_ERROR",
        status: 500,
        Desc: "A database operation failed.",
        response: "FAILED"
    },
    33: {
        code: "UNAUTHORIZED",
        status: 401,
        Desc: "Authentication is required.",
        response: "FAILED"
    },
    4: {
        code: "FORBIDDEN",
        status: 403,
        Desc: "You do not have permission to perform this action.",
        response: "FAILED"
    },
    5: {
        code: "INTERNAL_SERVER_ERROR",
        status: 500,
        Desc: "Something went wrong. Please try again later.",
        response: "FAILED"
    }
};

export const fieldNames = {
    title: "Title",
    description: "Description",
    totalMarks: "Total Marks",
    status: "Status",
    id: "ID"
};
