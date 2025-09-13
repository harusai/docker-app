const express = require('express');
const app = express();
const userRouter = require('./modules/user/user.route');
const port = process.env.ND_PORT || 3100

// 미들웨어 등록
app.use(express.json());

// 라우터 등록
//app.use('/users/all', userRouter); // '/users' 경로로 들어오는 요청을 userRouter가 처리

app.get('/index', (req, res) => {
  res.send('This is the cef base path! 1 ');
});


app.listen(port, () => {
    console.log('Server running on port 3100');
});
