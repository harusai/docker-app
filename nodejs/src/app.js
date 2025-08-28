const express = require('express');
const app = express();
//const { pool, connectWithRetry } = require('./utils/db');
const userRouter = require('./modules/user/user.route');

// 미들웨어 등록
app.use(express.json());

// 라우터 등록
app.use('/users', userRouter); // '/users' 경로로 들어오는 요청을 userRouter가 처리

app.listen(3000, () => {
    console.log('Server running on port 3000');
});



/*
// JSON 본문을 파싱하기 위한 미들웨어
app.use(express.json());

// process 에 환경변수 주입, .env 
require('dotenv').config();

const port = process.env.ND_PORT || 3000;

// 애플리케이션 시작 시 데이터베이스 연결 시도
connectWithRetry()
    .then(() => {
        // 데이터베이스 연결 성공 후 서버 시작
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(err => {
        console.error('Failed to start server due to database connection error:', err);
        process.exit(1); // 연결 실패 시 애플리케이션 종료
    });


// 미들웨어 불러오기
const requestLogger = require('./src/middlewares/login.middleware');
const verifyToken = require('./src/middlewares/auth.middleware');
const validateUser = require('./src/middlewares/validation.middleware');
const errorHandler = require('./src/middlewares/error.middleware');


// 공통 미들웨어 적용
app.use(express.json());
app.use(requestLogger); // 모든 요청에 대한 로깅


// 라우터 설정
// 토큰 인증이 필요한 라우트
app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: `Welcome, user ${req.user.id}` });
});

// 유효성 검사가 필요한 라우트 (회원가입 예시)
app.post('/signup', validateUser, (req, res) => {
    // 유효성 검사를 통과한 요청 처리
    const { name, email, password } = req.body;
    res.status(201).json({ message: 'User signed up successfully!', user: { name, email } });
});

// 에러 테스트용 라우트
app.get('/error', (req, res, next) => {
    const error = new Error('Test Error from /error route');
    error.statusCode = 400;
    next(error); // 에러 핸들링 미들웨어로 에러 전달
});

// 에러 핸들링 미들웨어는 항상 마지막에 위치해야 합니다.
app.use(errorHandler);
*/





/*

// 샘플 데이터
let posts = [
  { id: 1, title: '첫 번째 게시물', content: '안녕하세요' },
  { id: 2, title: '두 번째 게시물', content: 'Node.js는 멋져요' },
];

app.get('/', (req, res) => {
  res.send('Hello from the Node.js application!');
});

// 라우트 정의
// 모든 게시물 조회
app.get('/posts', (req, res) => {
  res.status(200).json(posts);
});

// ID로 특정 게시물 조회
app.get('/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).json({ message: '게시물을 찾을 수 없습니다' });
  }
  res.status(200).json(post);
});

// 새 게시물 생성
app.post('/posts', (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content,
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

*/