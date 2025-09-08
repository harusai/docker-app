const express = require('express');
const app = express();
const userRouter = require('./modules/user/user.route');
const port = process.env.ND_PORT || 3001;

// 미들웨어 등록
app.use(express.json());

// 라우터 등록
//app.use('/users/all', userRouter); // '/users' 경로로 들어오는 요청을 userRouter가 처리

app.get('/', (req, res) => {
    console.log('users 1 ');
  res.send('This is the users.js base path! 1 ');
});

app.get('/users/', (req, res) => {
    console.log('users 2 ');
  res.send('This is the users.js base path! 2 ');
});


app.get('/users/all', (req, res) => {
    console.log('order 1 ');
  res.send('This is the users.js all path! 3 ');
});



app.listen(port, () => {
    console.log('Server running on port 3001');
});
