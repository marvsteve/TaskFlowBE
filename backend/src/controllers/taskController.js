import {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
} from "../services/TaskService.js";

/**
 * ==========================================
 * GET /api/tasks
 * Mengambil seluruh data task
 * ==========================================
 */
export const getTasks = async (req, res) => {

    try {

        const tasks = await getAllTasks();

        res.status(200).json({
            success: true,
            message: "Data task berhasil diambil",
            data: tasks
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


/**
 * ==========================================
 * GET /api/tasks/:id
 * Mengambil task berdasarkan ID
 * ==========================================
 */
export const getTask = async (req, res) => {

    try {

        const task = await getTaskById(req.params.id);

        if (!task) {

            return res.status(404).json({
                success: false,
                message: "Task tidak ditemukan"
            });

        }

        res.status(200).json({
            success: true,
            data: task
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


/**
 * ==========================================
 * POST /api/tasks
 * Menambahkan task baru
 * ==========================================
 */
export const createNewTask = async (req, res) => {

    try {

        const task = {
            ...req.body,
            user_id: req.user.id
        };

        const result = await createTask(task);

        res.status(201).json({
            success: true,
            message: "Task berhasil ditambahkan",
            taskId: result.insertId
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


/**
 * ==========================================
 * PUT /api/tasks/:id
 * Mengubah task
 * ==========================================
 */
export const updateTaskById = async (req, res) => {

    try {

        const result = await updateTask(
            req.params.id,
            req.body
        );

        if (result.affectedRows === 0) {

            return res.status(404).json({
                success: false,
                message: "Task tidak ditemukan"
            });

        }

        res.status(200).json({
            success: true,
            message: "Task berhasil diupdate"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


/**
 * ==========================================
 * DELETE /api/tasks/:id
 * Menghapus task
 * ==========================================
 */
export const deleteTaskById = async (req, res) => {

    try {

        const result = await deleteTask(req.params.id);

        if (result.affectedRows === 0) {

            return res.status(404).json({
                success: false,
                message: "Task tidak ditemukan"
            });

        }

        res.status(200).json({
            success: true,
            message: "Task berhasil dihapus"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};