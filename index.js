
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./config/db.js";
import assessmentRouter from "./src/router/assessment.router.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check API
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Employee Assessment API is running"
    });
});

app.use("/api/assessments", assessmentRouter);

const PORT = process.env.PORT || 5000;

// Start server after database connection
const startServer = async () => {
    try {
        await sequelize.authenticate();

        console.log("PostgreSQL connected successfully");

        await sequelize.sync({ alter: true });
        console.log("Database tables synchronized successfully");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
};

startServer();
