const {exeQuery} = require('../../utils/db');

// 모든 사용자 조회
exports.findAll = async () => {
    const { rows } = await exeQuery('SELECT * FROM Southbottle.users');
    return rows;
};

// ID로 사용자 조회
exports.findById = async (id) => {
    const { rows } = await exeQuery('SELECT * FROM Southbottle.users WHERE id = $1', [id]);
    return rows[0];
};

// 사용자 생성
exports.create = async (userData) => {
    const { name, email } = userData;
    const { rows } = await exeQuery(
        'INSERT INTO Southbottle.users (name, email) VALUES ($1, $2) RETURNING *',
        [name, email]
    );
    return rows[0];
};

// 사용자 업데이트
exports.update = async (id, updateData) => {
    const { name, email } = updateData;
    const { rows } = await exeQuery(
        'UPDATE Southbottle.users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
        [name, email, id]
    );
    return rows[0];
};

// 사용자 삭제
exports.delete = async (id) => {
    const { rows } = await exeQuery('DELETE FROM Southbottle.users WHERE id = $1 RETURNING *', [id]);
    return rows[0];
};