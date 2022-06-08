import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cookies from 'js-cookie';
import './Reset.css';
import SearchAccount from './SearchAccount/SearchAccount';
import SendEmail from './SendEmail/SendEmail';
import CodeVerification from './CodeVerification/CodeVerification';
import Footer from '../../components/Login/Footer';

const Reset = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(2);

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    cookies.set('user', '');
    navigate('/login');
  };

  return (
    <div className='reset'>
      <div className='reset_header'>
        <img src='../../../icons/facebook.svg' alt='' />
        {user ? (
          <div className='right_reset'>
            <Link to='/profile'>
              <img src={user.picture} alt='' />
            </Link>
            <button className='blue_btn' onClick={() => logout()}>
              Logout
            </button>
          </div>
        ) : (
          <Link to='/login' className='right_reset'>
            <button className='blue_btn'>Login</button>
          </Link>
        )}
      </div>
      <div className='reset_wrap'>
        {visible === 0 && (
          <SearchAccount email={email} setEmail={setEmail} error={error} />
        )}
        {visible === 1 && <SendEmail user={user} />}
        {visible === 2 && (
          <CodeVerification user={user} code={code} setCode={setCode} error={error} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Reset;
