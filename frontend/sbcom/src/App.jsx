import reactLogo from './assets/react.svg'
import React, { Suspense } from 'react';
import './App.css'
//import Button from 'remoteApp/Button';
// UserList 컴포넌트 import 추가
// import UserList from './src/Users/UserList';



// 리모트 컴포넌트를 동적으로 import
const Remote1Component = React.lazy(() => import('sbcef/Remote1Component'));
//const Remote2Component = React.lazy(() => import('remote2/Remote2Component'));
//const Remote3Component = React.lazy(() => import('remote3/Remote3Component'));


function App() {
  return (
    <div className="App">
      <h1>Host Application</h1>
      <Suspense fallback={<div>Loading Remote Components...</div>}>
        <Remote1Component />
      </Suspense>
    </div>
  )
}

export default App
