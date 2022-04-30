import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { getRole } from './common/functool';

import VerifyEmail from './VerifyEmail';
import Home from './Home';
import SignIn from './SignIn';
import ResetPassword from './ResetPassword';
import ResentEmail from './ResentEmail';

import Nav from './components/Nav';

function App() {
  let role = getRole()

  if (role === 'Admin') {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path='/' exact element={Home} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }

  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' exact element={<SignIn />} />
          <Route path='/:token/verify/' exact element={<VerifyEmail />} />
          <Route path='/reset/password/' exact element={<ResetPassword />} />
          <Route path='/resent/email/' exact element={<ResentEmail />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
