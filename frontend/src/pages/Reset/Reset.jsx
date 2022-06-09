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
import ChangePassword from './ChangePassword/ChangePassword';

const Reset = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userInfos, setUserInfos] = useState('');

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
          <SearchAccount
            email={email}
            setEmail={setEmail}
            error={error}
            setError={setError}
            setLoading={setLoading}
            setUserInfos={setUserInfos}
            setVisible={setVisible}
          />
        )}
        {visible === 1 && userInfos && (
          <SendEmail
            userInfos={userInfos}
            setUserInfos={setUserInfos}
            error={error}
            setError={setError}
            loading={loading}
            setLoading={setLoading}
            setVisible={setVisible}
          />
        )}
        {visible === 2 && (
          <CodeVerification
            user={user}
            userInfos={userInfos}
            code={code}
            setCode={setCode}
            error={error}
            setError={setError}
            loading={loading}
            setLoading={setLoading}
            setVisible={setVisible}
          />
        )}
        {visible === 3 && (
          <ChangePassword
            user={user}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            error={error}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Reset;
