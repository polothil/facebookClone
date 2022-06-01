import React, { useState } from 'react';
import './Login.css';
import LoginForm from '../../components/Login/LoginForm';
import Footer from '../../components/Login/Footer';
import RegistrationForm from '../../components/Login/RegistrationForm';

const Login = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div className='login'>
      <div className='login_wrapper'>
        <LoginForm setVisible={setVisible} />
        {visible && <RegistrationForm setVisible={setVisible} />}
        <Footer />
      </div>
    </div>
  );
};

export default Login;
