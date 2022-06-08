import React from 'react';
import { Form, Formik } from 'formik';
import LoginInput from '../../../components/Inputs/LoginInput/LoginInput';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

const CodeVerification = ({ code, error, setCode }) => {
  const validateCode = Yup.object({
    code: Yup.string()
      .required('Code is required.')
      .min('5', 'Code must be 5 characters.')
      .max('5', 'Code must be 5 characters.'),
  });
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
      >
        {(formik) => (
          <Form>
            <LoginInput
              type='text'
              name='code'
              onChange={(e) => setCode(e.target.value)}
              placeholder='Code'
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

export default CodeVerification;
