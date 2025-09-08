const db = require('../utils/db');

exports.create = async (orderData) => {
    const { userId, items, total } = orderData;
    const { rows } = await db.query(
        'INSERT INTO orders (user_id, items, total) VALUES ($1, $2, $3) RETURNING *',
        [userId, JSON.stringify(items), total]
    );
    return rows[0];
};

exports.findByUserId = async (userId) => {
    const { rows } = await db.query('SELECT * FROM orders WHERE user_id = $1', [userId]);
    return rows;
};

exports.findById = async (orderId) => {
    const { rows } = await db.query('SELECT * FROM orders WHERE id = $1', [orderId]);
    return rows[0];
};