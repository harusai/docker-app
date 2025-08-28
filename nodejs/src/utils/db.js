// db.js (PostgreSQL 연결 관리 파일)
const { Pool } = require('pg');

// 환경 변수를 사용하여 DB 연결 정보를 설정하는 것을 권장합니다.
// .env 파일에 DB_HOST, DB_USER, DB_PASSWORD, DB_NAME 등을 저장하세요.
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

async function connectWithRetry() {
    let retries = 5;
    while (retries > 0) {
        try {
            await pool.connect();
            console.log('Database connected successfully!');
            return pool;
        } catch (err) {
            console.error('Failed to connect to the database. Retrying...');
            console.error(err);
            retries--;
            await new Promise(res => setTimeout(res, 3000)); // 3초 대기 후 재시도
        }
    }
    throw new Error('Could not connect to the database after multiple retries.');
}

// 모든 서비스에서 사용할 쿼리 함수를 정의합니다.
// 이 함수는 SQL 쿼리와 파라미터를 받아 쿼리를 실행합니다.
async function exeQuery(text, params) {
    return pool.query(text, params);
} 

module.exports = {
    connectWithRetry,
    exeQuery
};