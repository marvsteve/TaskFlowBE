import pool from "./config/database.js";
import express from "express";
import dotenv from "dotenv";

import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Route
app.use("/api/tasks", taskRoutes);

// Route utama
app.get("/", (req, res) => {
    res.send("TaskFlow API berjalan...");
});

try {
    const connection = await pool.getConnection();
    console.log("✅ Database berhasil terhubung!");
    connection.release();
} catch (error) {
    console.error("❌ Gagal terhubung ke database");
    console.error(error);
}

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});