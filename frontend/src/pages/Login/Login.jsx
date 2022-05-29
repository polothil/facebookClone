import React from 'react';
import './Login.css';
import LoginForm from '../../components/Login/LoginForm';
import Footer from '../../components/Login/Footer';
import RegistrationForm from '../../components/Login/RegistrationForm';

const Login = () => {
  return (
    <div className='login'>
      <div className='login_wrapper'>
        <LoginForm />
        <RegistrationForm />
        <Footer />
      </div>
    </div>
  );
};

export default Login;
