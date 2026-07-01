import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
    getTasks,
    getTask,
    createNewTask,
    updateTaskById,
    deleteTaskById
} from "../controllers/taskController.js";

const router = express.Router();

/**
 * ==========================================
 * GET Semua Task
 * ==========================================
 */
router.get(
    "/",
    authMiddleware,
    getTasks
);

/**
 * ==========================================
 * GET Task Berdasarkan ID
 * ==========================================
 */
router.get(
    "/:id",
    authMiddleware,
    getTask
);

/**
 * ==========================================
 * POST Tambah Task
 * ==========================================
 */
router.post(
    "/",
    authMiddleware,
    createNewTask
);

/**
 * ==========================================
 * PUT Update Task
 * ==========================================
 */
router.put(
    "/:id",
    authMiddleware,
    updateTaskById
);

/**
 * ==========================================
 * DELETE Task
 * ==========================================
 */
router.delete(
    "/:id",
    authMiddleware,
    deleteTaskById
);

export default router;