import * as taskService from "../services/TaskService.js";

// Mengambil semua task
export const getAllTasks = async (req, res) => {
    try {
        const tasks = await taskService.getAllTasks();

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

export const getTaskById = async (req, res) => {

    try {

        const task = await taskService.getTaskById(req.params.id);

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

// Menambahkan task baru
export const createTask = async (req, res) => {
    try {

        const result = await taskService.createTask(req.body);

        res.status(201).json({
            success: true,
            message: "Task berhasil ditambahkan",
            id: result.insertId
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

export const updateTask = async (req, res) => {

    try {

        const result = await taskService.updateTask(
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

export const deleteTask = async (req, res) => {

    try {

        const result = await taskService.deleteTask(req.params.id);

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