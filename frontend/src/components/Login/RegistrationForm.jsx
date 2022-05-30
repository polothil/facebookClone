import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import RegisterInput from '../Inputs/RegisterInput/RegisterInput';
import * as Yup from 'yup';

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

  const handleRegiterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const years = Array.from(
    new Array(108),
    (val, index) => new Date().getFullYear() - index
  );
  const months = Array.from(new Array(12), (val, index) => 1 + index);
  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };
  const days = Array.from(new Array(getDays()), (val, index) => 1 + index);

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
        >
          {(formik) => (
            <Form className='register_form'>
              <div className='reg_line'>
                <RegisterInput
                  type='text'
                  name='first_name'
                  placeholder='First Name'
                  onChange={handleRegiterChange}
                />
                <RegisterInput
                  type='text'
                  name='last_name'
                  placeholder='Surname'
                  onChange={handleRegiterChange}
                />
              </div>
              <div className='reg_line'>
                <RegisterInput
                  type='text'
                  name='email'
                  placeholder='Mobile number or email address'
                  onChange={handleRegiterChange}
                />
              </div>
              <div className='reg_line'>
                <RegisterInput
                  type='password'
                  name='password'
                  placeholder='New password'
                  onChange={handleRegiterChange}
                />
              </div>
              <div className='reg_col'>
                <div className='reg_line_header'>
                  Date of birth <i className='info_icon'></i>
                </div>
                <div className='reg_grid'>
                  <select
                    name='bDay'
                    id='bDay'
                    value={bDay}
                    onChange={handleRegiterChange}
                  >
                    {days.map((day, index) => (
                      <option value={day} key={index}>
                        {day}
                      </option>
                    ))}
                  </select>
                  <select
                    name='bMonth'
                    id='bMonth'
                    value={bMonth}
                    onChange={handleRegiterChange}
                  >
                    {months.map((month, index) => (
                      <option value={month} key={index}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select
                    name='bYear'
                    id='bYear'
                    value={bYear}
                    onChange={handleRegiterChange}
                  >
                    {years.map((year, index) => (
                      <option value={year} key={index}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='reg_col'>
                <div className='reg_line_header'>
                  Gender <i className='info_icon'></i>
                </div>
                <div className='reg_grid'>
                  <label htmlFor='male'>
                    Male
                    <input
                      type='radio'
                      name='gender'
                      id='male'
                      value='male'
                      onChange={handleRegiterChange}
                    />
                  </label>
                  <label htmlFor='female'>
                    Female
                    <input
                      type='radio'
                      name='gender'
                      id='female'
                      value='female'
                      onChange={handleRegiterChange}
                    />
                  </label>
                  <label htmlFor='custom'>
                    Custom
                    <input
                      type='radio'
                      name='gender'
                      id='custom'
                      value='custom'
                      onChange={handleRegiterChange}
                    />
                  </label>
                </div>
              </div>
              <div className='reg_infos'>
                By clicking Sign Up, you agree to our{' '}
                <span> Terms, Data Policy &nbsp;</span> and <span>Cookie Policy.</span>
                You may receive SMS notifications from us and can opt out at any time.
              </div>
              <div className='reg_btn_wrapper'>
                <button className='blue_btn open_signup'>Sign Up</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegistrationForm;
