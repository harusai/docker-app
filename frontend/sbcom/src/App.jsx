// import reactLogo from './assets/react.svg'

import { Routes, Route } from 'react-router-dom';
import LoginPage from './src/pages/login/LoginPage';
import MainPage from './src/pages/main/MainPage';

import './src/styles/App.css'
//import Button from 'remoteApp/Button';
// UserList 컴포넌트 import 추가
//import UserList from './src/services/Users/UserList';

// 리모트 컴포넌트를 동적으로 import
// const Remote1Component = React.lazy(() => import('sbcef/Remote1Component'));
//const Remote2Component = React.lazy(() => import('remote2/Remote2Component'));
//const Remote3Component = React.lazy(() => import('remote3/Remote3Component'));


function App() {
  return (
    <Routes>
      <Route path="/sbcom/" element={<LoginPage />} />
      <Route path="/sbcom/main" element={<MainPage />} />
      {/* 추가 라우트들을 여기에 정의할 수 있습니다. */}
    </Routes>
  );
}


export default App
