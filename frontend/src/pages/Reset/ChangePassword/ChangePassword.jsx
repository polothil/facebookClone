import React from 'react';
import { Form, Formik } from 'formik';
import LoginInput from '../../../components/Inputs/LoginInput/LoginInput';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';

const ChangePassword = ({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  error,
  setError,
  setLoading,
  setVisible,
  userInfos,
}) => {
  const navigate = useNavigate();
  const updatePassowrd = async () => {
    try {
      setLoading(true);
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/changePassword`, {
        email: userInfos.email,
        password,
      });
      setError('');
      setLoading(false);
      navigate('/');
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  const validatePassword = Yup.object({
    password: Yup.string()
      .required(
        'Enter a combination of at least six numbers, letters and punctuation marks (like ! and &).'
      )
      .min(6, 'Password must be at least 6 characters')
      .max(36, "Password can't be longer than 36 characters"),
    confirmPassword: Yup.string()
      .required('Retype your password.')
      .oneOf([Yup.ref('password')], 'Passwords must match.'),
  });
  return (
    <div className='reset_form' style={{ height: '320px' }}>
      <div className='reset_form_header'>Change Password</div>
      <div className='reset_form_text'>Pick a strong password.</div>
      <Formik
        enableReinitialize
        initialValues={{
          password,
          confirmPassword,
        }}
        validationSchema={validatePassword}
        onSubmit={() => updatePassowrd()}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type='password'
              name='password'
              onChange={(e) => setPassword(e.target.value)}
              placeholder='New Password'
            />
            <LoginInput
              type='password'
              name='confirmPassword'
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='Confrim Password'
              bottom
            />
            {error && <div className='error_tetx'>{error}</div>}
            <div className='reset_form_btns'>
              <Link to='/login' className='gray_btn'>
                Cancel
              </Link>
              <button type='submit' className='blue_btn'>
                Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePassword;
