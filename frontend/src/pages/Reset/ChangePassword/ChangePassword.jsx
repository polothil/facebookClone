import React from 'react';
import { Form, Formik } from 'formik';
import LoginInput from '../../../components/Inputs/LoginInput/LoginInput';
import { Link } from 'react-router-dom';

const ChangePassword = ({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  error,
}) => {
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
      >
        {(formik) => (
          <Form>
            <LoginInput
              type='text'
              name='password'
              onChange={(e) => setPassword(e.target.value)}
              placeholder='New Password'
            />
            <LoginInput
              type='text'
              name='confirmPassword'
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='Confrim Password'
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
