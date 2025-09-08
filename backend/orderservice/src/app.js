const express = require('express');
const app = express();
const orderRouter = require('./modules/order/order.route');
const port = process.env.ND_PORT || 3002;

// 미들웨어 등록
app.use(express.json());

// 라우터 등록
//app.use('/orders/all', orderRouter); // '/orders' 경로로 들어오는 요청을 ordersRouter가 처리
app.get('/', (req, res) => {
    console.log('order 1 ');
  res.send('This is the orders.js base path! 1 ');
});

app.get('/orders/', (req, res) => {
    console.log('order 2 ');
  res.send('This is the orders.js base path! 2 ');
});


app.get('/orders/all', (req, res) => {
    console.log('order 1 ');
  res.send('This is the orders.js all path! 3 ');
});



app.listen(port, () => {
    console.log('Server running on port 3002');
});


