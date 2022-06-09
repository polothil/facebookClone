import React from 'react';
import { Form, Formik } from 'formik';
import LoginInput from '../../../components/Inputs/LoginInput/LoginInput';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';

const CodeVerification = ({
  code,
  error,
  setCode,
  setError,
  setLoading,
  setVisible,
  userInfos,
}) => {
  const validateCode = Yup.object({
    code: Yup.string()
      .required('Code is required.')
      .min('5', 'Code must be 5 characters.')
      .max('5', 'Code must be 5 characters.'),
  });

  const verifyCode = async () => {
    try {
      setLoading(true);
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/validateResetCode`, {
        email: userInfos.email,
        code,
      });
      setVisible(3);
      setError('');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className='reset_form'>
      <div className='reset_form_header'>Code Verification</div>
      <div className='reset_form_text'>
        Please enter the code that was sent to your email.
      </div>
      <Formik
        enableReinitialize
        initialValues={{
          code,
        }}
        validationSchema={validateCode}
        onSubmit={() => verifyCode()}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type='text'
              name='code'
              onChange={(e) => setCode(e.target.value)}
              placeholder='Code'
            />
            {error && <div className='error_text'>{error}</div>}
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

export default CodeVerification;
