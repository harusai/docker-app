const db = require('../utils/db');

exports.findAll = async () => {
    const { rows } = await db.query('SELECT * FROM products');
    return rows;
};

exports.findById = async (id) => {
    const { rows } = await db.query('SELECT * FROM products WHERE id = $1', [id]);
    return rows[0];
};

exports.create = async (productData) => {
    const { name, price } = productData;
    const { rows } = await db.query(
        'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *',
        [name, price]
    );
    return rows[0];
};

exports.update = async (id, updateData) => {
    const { name, price } = updateData;
    const { rows } = await db.query(
        'UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *',
        [name, price, id]
    );
    return rows[0];
};