const express = require('express');
const app = express();
const orderRouter = require('./modules/order/order.route');
const port = process.env.ND_PORT || 3200;

// 미들웨어 등록
app.use(express.json());

// 라우터 등록
//app.use('/orders/all', orderRouter); // '/orders' 경로로 들어오는 요청을 ordersRouter가 처리
app.get('/index', (req, res) => {
  res.send('This is the asl base path! 1 ');
});



app.listen(port, () => {
    console.log('Server running on port 3200');
});


