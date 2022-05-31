import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import RegisterInput from '../Inputs/RegisterInput/RegisterInput';
import * as Yup from 'yup';
import DateOfBirthSelect from './DateOfBirthSelect';
import GenderSelect from './GenderSelect';
import DotLoader from 'react-spinners/DotLoader';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const userInfos = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  bYear: new Date().getFullYear(),
  bMonth: new Date().getMonth() + 1,
  bDay: new Date().getDate(),
  gender: '',
};

const RegistrationForm = () => {
  const [user, setUser] = useState(userInfos);
  const { first_name, last_name, email, password, bYear, bMonth, bDay, gender } = user;
  const [dateError, setDateError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerSubmit = async () => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, {
        first_name,
        last_name,
        email,
        password,
        bYear,
        bMonth,
        bDay,
        gender,
      });
      console.log(data);
      setError('');
      setSuccess(data.message);
      const { message, ...rest } = data;
      setTimeout(() => {
        dispatch({ type: 'LOGIN', payload: rest });
        cookies.set('user', JSON.stringify(rest));
        navigate('/');
      }, 2000);
    } catch (error) {
      setLoading(false);
      setSuccess('');
      setError(error.response.data.message);
    }
  };

  const registerValidation = Yup.object({
    first_name: Yup.string()
      .required("What's your first name?")
      .min(2, 'First name must be between 2 and 16 characters.')
      .max(16, 'First name must be between 2 and 16 characters.')
      .matches(/^[aA-zZ\s]+$/, 'Numbers and special characters are not allowed'),
    last_name: Yup.string()
      .required("What's your surname?")
      .min(2, 'Surname must be between 2 and 16 characters.')
      .max(16, 'Surname must be between 2 and 16 characters.')
      .matches(/^[aA-zZ\s]+$/, 'Numbers and special characters are not allowed'),
    email: Yup.string()
      .required(
        "You'll need this when you log in and if you ever need to reset your password"
      )
      .email('Enter a valid email address.'),
    password: Yup.string()
      .required(
        'Enter a combination of at least six numbers, letters and punctuation marks (like ! and &).'
      )
      .min(6, 'Password must be at least 6 characters')
      .max(36, "Password can't be longer than 36 characters"),
  });
  return (
    <div className='blur'>
      <div className='register'>
        <div className='register_header'>
          <i className='exit_icon'></i>
          <span>Sign Up</span>
          <span>It's quick and easy</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
          }}
          validationSchema={registerValidation}
          onSubmit={() => {
            let current_date = new Date();
            let picked_date = new Date(bYear, bMonth - 1, bDay);
            let atleast14 = new Date(1970 + 14, 0, 1);
            let noMoreThan70 = new Date(1970 + 70, 0, 1);
            if (current_date - picked_date < atleast14) {
              setDateError(
                'It looks like you entered the wrong info. Please be sure to use your real birthday.'
              );
            } else if (current_date - picked_date > noMoreThan70) {
              setDateError(
                'It looks like you entered the wrong info. Please be sure to use your real birthday.'
              );
            } else if (gender === '') {
              setGenderError(
                'Please choose a gender. You can change who can see this later.'
              );
            } else {
              setDateError('');
              setGenderError('');
              registerSubmit();
            }
          }}
        >
          {(formik) => (
            <Form className='register_form'>
              <div className='reg_line'>
                <RegisterInput
                  type='text'
                  name='first_name'
                  placeholder='First Name'
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type='text'
                  name='last_name'
                  placeholder='Surname'
                  onChange={handleRegisterChange}
                />
              </div>
              <div className='reg_line'>
                <RegisterInput
                  type='text'
                  name='email'
                  placeholder='Mobile number or email address'
                  onChange={handleRegisterChange}
                />
              </div>
              <div className='reg_line'>
                <RegisterInput
                  type='password'
                  name='password'
                  placeholder='New password'
                  onChange={handleRegisterChange}
                />
              </div>
              <div className='reg_col'>
                <div className='reg_line_header'>
                  Date of birth <i className='info_icon'></i>
                </div>

                <DateOfBirthSelect
                  bDay={bDay}
                  bMonth={bMonth}
                  bYear={bYear}
                  dateError={dateError}
                  handleRegisterChange={handleRegisterChange}
                />
              </div>
              <div className='reg_col'>
                <div className='reg_line_header'>
                  Gender <i className='info_icon'></i>
                </div>
                <GenderSelect
                  genderError={genderError}
                  handleRegisterChange={handleRegisterChange}
                />
              </div>
              <div className='reg_infos'>
                By clicking Sign Up, you agree to our{' '}
                <span> Terms, Data Policy &nbsp;</span> and <span>Cookie Policy.</span>
                You may receive SMS notifications from us and can opt out at any time.
              </div>
              <div className='reg_btn_wrapper'>
                <button className='blue_btn open_signup'>Sign Up</button>
              </div>
              <DotLoader color='#1876f2' loading={loading} size={50} />
              {error && <div className='error_text'>{error}</div>}
              {success && <div className='success_text'>{success}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegistrationForm;
