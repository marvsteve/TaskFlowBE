import pool from "../config/database.js";

export const getAllTasks = async () => {
    
    const [rows] = await pool.query(`
        SELECT
            tasks.id,
            tasks.title,
            tasks.description,
            tasks.status,
            users.name AS user_name,
            categories.name AS category_name,
            categories.color
        FROM tasks
        JOIN users
            ON tasks.user_id = users.id
        JOIN categories
            ON tasks.category_id = categories.id
        ORDER BY tasks.id DESC
    `);

    return rows;
};

export const getTaskById = async (id) => {

    const [rows] = await pool.query(
        "SELECT * FROM tasks WHERE id = ?",
        [id]
    );

    return rows[0];
};

export const updateTask = async (id, task) => {

    const {
        title,
        description,
        status,
        user_id,
        category_id
    } = task;

    const [result] = await pool.query(
        `
        UPDATE tasks
        SET
            title = ?,
            description = ?,
            status = ?,
            user_id = ?,
            category_id = ?
        WHERE id = ?
        `,
        [
            title,
            description,
            status,
            user_id,
            category_id,
            id
        ]
    );

    return result;

};

export const deleteTask = async (id) => {

    const [result] = await pool.query(
        "DELETE FROM tasks WHERE id = ?",
        [id]
    );

    return result;

};

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
        (title, description, status, user_id, category_id)

        VALUES (?, ?, ?, ?, ?)
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