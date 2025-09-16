import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'; // BrowserRouter 추가
import App from './App'
import './src/styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* App 컴포넌트를 BrowserRouter로 감싸기 */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);