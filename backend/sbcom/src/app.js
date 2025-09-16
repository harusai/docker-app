const express = require('express');
const app = express();
//const { pool, connectWithRetry } = require('./utils/db');
const authRouter = require('./modules/auth/auth.route'); // auth 라우터 추가 login
const userRouter = require('./modules/user/user.route');

const port = process.env.ND_PORT || 3000;

// 미들웨어 등록
app.use(express.json());

// 라우터 등록
app.use('/users', userRouter); 
app.use('/auth', authRouter);

// app.use('/role', userRouter); 
// app.use('/company', userRouter); 
// app.use('/code', userRouter); 
// app.use('/menu', userRouter); 
// app.use('/screen', userRouter); 

app.get('/index', (req, res) => {
  res.send('This is the com base path! 1 ');
});

app.listen(port, () => {
    console.log('Server running on port 3000');
});
