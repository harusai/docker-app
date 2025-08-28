const express = require('express');
const app = express();
const userRouter = require('./modules/user/user.route');
const port = process.env.ND_PORT || 3000;

// 미들웨어 등록
app.use(express.json());

// 라우터 등록
app.use('/users', userRouter); // '/users' 경로로 들어오는 요청을 userRouter가 처리

// You can also add a simple root route for testing
app.get('/', (req, res) => {
    res.send('Welcome to the Node.js Userservice API!');
});


app.listen(port, () => {
    console.log('Server running on port 3000');
});
