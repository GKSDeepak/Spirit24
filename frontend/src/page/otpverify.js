import React from 'react';
import Header from "../components/header/header.js";
import Footer from "../components/footer/footer.js";
import OtpForm from '../components/form/otpForm.js';


const otpVerify = () => {
  return (
    <div>
        <Header/>
      <OtpForm/>
      <Footer/>
    </div>
  );
};

export default otpVerify;
