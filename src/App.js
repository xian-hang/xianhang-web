import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { getUserId } from './common/functool';

import VerifyEmail from './VerifyEmail';
import Home from './Home';
import SignIn from './SignIn';
import ResetPassword from './ResetPassword';
import ResentEmail from './ResentEmail';
import ReportDetails from './ReportDetails'

import Nav from './components/Nav';

function App() {
  let id = getUserId()

  return (
      <>
        <BrowserRouter>
          <Nav />
          <Routes>
            {id && <Route path='/' exact element={<Home />} />}
            {id && <Route path='/report/:id' exact element={<ReportDetails />} />}
            <Route path='/' exact element={<SignIn />} />
            <Route path='/:token/verify/' exact element={<VerifyEmail />} />
            <Route path='/reset/password/' exact element={<ResetPassword />} />
            <Route path='/resent/email/' exact element={<ResentEmail />} />
            <Route path='*' exact element={<Navigate to="/" />} />
            
          </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;
