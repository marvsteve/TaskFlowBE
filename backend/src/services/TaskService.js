import pool from "../config/database.js";

/**
 * ==========================================
 * GET Semua Task Milik User Login
 * ==========================================
 */
export const getAllTasks = async (userId) => {

    const [rows] = await pool.query(
        `
        SELECT
            tasks.id,
            tasks.title,
            tasks.description,
            tasks.status,
            users.name AS user_name,
            categories.name AS category_name,
            categories.color,
            tasks.created_at,
            tasks.updated_at
        FROM tasks
        JOIN users
            ON tasks.user_id = users.id
        JOIN categories
            ON tasks.category_id = categories.id
        WHERE tasks.user_id = ?
        ORDER BY tasks.id DESC
        `,
        [userId]
    );

    return rows;

};

/**
 * ==========================================
 * GET Task Berdasarkan ID
 * Hanya task milik user login
 * ==========================================
 */
export const getTaskById = async (id, userId) => {

    const [rows] = await pool.query(
        `
        SELECT *
        FROM tasks
        WHERE id = ?
        AND user_id = ?
        `,
        [id, userId]
    );

    return rows[0];

};

/**
 * ==========================================
 * CREATE Task
 * ==========================================
 */
export const createTask = async (task) => {

    const {
        title,
        description,
        status,
        user_id,
        category_id
    } = task;

    const [result] = await pool.query(
        `
        INSERT INTO tasks
        (
            title,
            description,
            status,
            user_id,
            category_id
        )
        VALUES
        (?, ?, ?, ?, ?)
        `,
        [
            title,
            description,
            status,
            user_id,
            category_id
        ]
    );

    return result;

};

/**
 * ==========================================
 * UPDATE Task
 * Hanya task milik user login
 * ==========================================
 */
export const updateTask = async (id, userId, task) => {

    const {
        title,
        description,
        status,
        category_id
    } = task;

    const [result] = await pool.query(
        `
        UPDATE tasks
        SET
            title = ?,
            description = ?,
            status = ?,
            category_id = ?
        WHERE id = ?
        AND user_id = ?
        `,
        [
            title,
            description,
            status,
            category_id,
            id,
            userId
        ]
    );

    return result;

};

/**
 * ==========================================
 * DELETE Task
 * Hanya task milik user login
 * ==========================================
 */
export const deleteTask = async (id, userId) => {

    const [result] = await pool.query(
        `
        DELETE FROM tasks
        WHERE id = ?
        AND user_id = ?
        `,
        [
            id,
            userId
        ]
    );

    return result;

};