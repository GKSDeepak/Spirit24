// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './page/landing';
import Signup from './page/signup';
import Login from './page/login';
import Dashboard from './page/dashboard';
import OtpVerify from './page/otpverify';
import RegistrationSuccess from './page/registrationSuccess';
import Leaderboard from './components/Leaderboard/Leaderboard.js';

const PrivateRoute = ({ element: Element }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Simplified authentication check
  return isAuthenticated ? <Element /> : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/ca" element={<Landing />} />
        <Route path="/ca/signup" element={<Signup />} /> 
        <Route path="/ca/login" element={<Login />} />
        <Route path="/ca/otpVerify" element={<OtpVerify />} />
        <Route path="/ca/dashboard" element={<PrivateRoute element={Dashboard} />} />
        <Route path="/ca/registrationSuccess" element={<PrivateRoute element={RegistrationSuccess} />} />
        {/* <Route path="/Leaderboard" element={<Leaderboard />} /> */}
        {/* <Route path="/registrationSuccess" element={<RegistrationSuccess/>}></Route> */}
        <Route path="*" element={<Navigate to="/ca" />} />
      </Routes>
    </Router>
  );
}

export default App;
