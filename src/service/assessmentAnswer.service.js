
import db from "../repository/assessmentAnswer.repository.js";
import Assessment from "../model/assessment.model.js";
import Question from "../model/question.model.js";

const create = async (data) => {
    try {
        const { assessmentId, employeeId, answers } = data;

        // 1. Validate assessment ID
        if (
            !Number.isInteger(Number(assessmentId)) ||
            Number(assessmentId) <= 0
        ) {
            return {
                status: 2,
                code: 0,
                Desc: "Valid assessmentId is required."
            };
        }

        // 2. Validate employee ID
        if (
            employeeId === undefined ||
            employeeId === null ||
            String(employeeId).trim() === ""
        ) {
            return {
                status: 2,
                code: 0,
                Desc: "Employee ID is required."
            };
        }

        // 3. Validate answers
        if (!Array.isArray(answers) || answers.length === 0) {
            return {
                status: 2,
                code: 0,
                Desc: "At least one answer is required."
            };
        }

        // 4. Check assessment
        const assessment = await Assessment.findByPk(
            Number(assessmentId)
        );

        if (!assessment || !assessment.status) {
            return {
                status: 1,
                code: 0,
                Desc: "Assessment not found or inactive."
            };
        }

        // 5. Get all active questions for this assessment
        const questions = await Question.findAll({
            where: {
                assessmentId: Number(assessmentId),
                status: true
            },
            order: [["id", "ASC"]]
        });

        if (questions.length === 0) {
            return {
                status: 1,
                code: 0,
                Desc: "No active questions found for this assessment."
            };
        }

        // 6. Create a map for quick question lookup
        const questionMap = new Map(
            questions.map((question) => [
                question.id,
                question
            ])
        );

        // 7. Validate submitted answers
        const submittedIds = new Set();

        for (const answer of answers) {
            if (
                !answer ||
                !Number.isInteger(Number(answer.questionId)) ||
                Number(answer.questionId) <= 0
            ) {
                return {
                    status: 2,
                    code: 0,
                    Desc: "A valid questionId is required for every answer."
                };
            }

            const questionId = Number(answer.questionId);

            // Ensure the question belongs to this assessment
            if (!questionMap.has(questionId)) {
                return {
                    status: 2,
                    code: 0,
                    Desc: `Invalid questionId: ${questionId}`
                };
            }

            // Prevent duplicate answers for the same question
            if (submittedIds.has(questionId)) {
                return {
                    status: 2,
                    code: 0,
                    Desc: `Duplicate answer for questionId: ${questionId}`
                };
            }

            // Ensure selected answer is provided
            if (
                answer.selectedAnswer === undefined ||
                answer.selectedAnswer === null ||
                String(answer.selectedAnswer).trim() === ""
            ) {
                return {
                    status: 2,
                    code: 0,
                    Desc: `selectedAnswer is required for questionId: ${questionId}`
                };
            }

            const question = questionMap.get(questionId);

            // Validate selected option for multiple-choice questions
            if (
                question.questionType === "multiple_choice" &&
                Array.isArray(question.options) &&
                !question.options.some(
                    (option) =>
                        String(option).trim().toLowerCase() ===
                        String(answer.selectedAnswer).trim().toLowerCase()
                )
            ) {
                return {
                    status: 2,
                    code: 0,
                    Desc: `Invalid selected option for questionId: ${questionId}`
                };
            }

            submittedIds.add(questionId);
        }

        // 8. Calculate total marks from ALL active questions
        const totalMarks = questions.reduce(
            (total, question) => total + Number(question.marks),
            0
        );

        // 9. Evaluate submitted answers
        let score = 0;

        const evaluatedAnswers = answers.map((answer) => {
            const question = questionMap.get(
                Number(answer.questionId)
            );

            const isCorrect =
                String(answer.selectedAnswer).trim().toLowerCase() ===
                String(question.correctAnswer ?? "").trim().toLowerCase();

            const marksObtained = isCorrect
                ? Number(question.marks)
                : 0;

            score += marksObtained;

            return {
                questionId: question.id,
                selectedAnswer: answer.selectedAnswer,
                isCorrect,
                marksObtained
            };
        });

        // 10. Add unanswered questions with zero marks
        for (const question of questions) {
            if (!submittedIds.has(question.id)) {
                evaluatedAnswers.push({
                    questionId: question.id,
                    selectedAnswer: null,
                    isCorrect: false,
                    marksObtained: 0
                });
            }
        }

        // 11. Calculate percentage
        const percentage =
            totalMarks > 0
                ? Number(((score / totalMarks) * 100).toFixed(2))
                : 0;

        // 12. Get previous attempts for this employee and assessment
        const previousAttempts = await db.findAll({
            assessmentId: Number(assessmentId),
            employeeId: String(employeeId),
            page: 1,
            limit: 1
        });

        if (previousAttempts.code === 0) {
            return previousAttempts;
        }

        const attemptNumber = previousAttempts.count + 1;

        // 13. Save each attempt as a separate record
        const result = await db.create({
            assessmentId: Number(assessmentId),
            employeeId: String(employeeId),
            attemptNumber,
            answers: evaluatedAnswers,
            score,
            totalMarks,
            percentage
        });

        if (result.code === 0) {
            return result;
        }

        return {
            status: 1001,
            code: 1,
            data: result.data,
            Desc: "Assessment submitted successfully."
        };
    } catch (error) {
        console.error("Assessment answer service error:", error);

        return {
            status: 10,
            code: 0,
            error
        };
    }
};

const findAll = async (params = {}) => {
    try {
        return await db.findAll(params);
    } catch (error) {
        console.error("Assessment answer list service error:", error);

        return {
            status: 10,
            code: 0,
            error
        };
    }
};

const findById = async (id) => {
    try {
        if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
            return {
                status: 2,
                code: 0,
                Desc: "Valid submission ID is required."
            };
        }

        return await db.findById(Number(id));
    } catch (error) {
        console.error("Assessment answer find service error:", error);

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
