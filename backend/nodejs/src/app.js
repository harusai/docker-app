const express = require('express');
const app = express();
//const { pool, connectWithRetry } = require('./utils/db');
const userRouter = require('./modules/user/user.route');
const port = process.env.ND_PORT || 3000;

// 미들웨어 등록
app.use(express.json());

// 라우터 등록
//app.use('/nodejs/all', userRouter); // '/users' 경로로 들어오는 요청을 userRouter가 처리

app.get('/', (req, res) => {
    console.log('node 1 ');
  res.send('This is the Node.js base path! 1 ');
});


app.get('/nodejs/', (req, res) => {
    console.log('node 2 ');
  res.send('This is the Node.js base path! 2 ');
});


app.get('/nodejs/all', (req, res) => {
    console.log('node 3 ');
  res.send('This is the Node.js all path! 3 ');
});




app.listen(port, () => {
    console.log('Server running on port 3000');
});
