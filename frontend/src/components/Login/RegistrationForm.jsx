import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import RegisterInput from '../Inputs/RegisterInput/RegisterInput';

const userInfos = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  bYear: '',
  bMonth: '',
  bDay: '',
  gender: '',
};

const RegistrationForm = () => {
  const [user, setUser] = useState(userInfos);

  const handleRegiterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className='blur'>
      <div className='register'>
        <div className='register_header'>
          <i className='exit_icon'></i>
          <span>Sign Up</span>
          <span>It's quick and easy</span>
        </div>
        <Formik>
          {(formik) => (
            <Form className='register_form'>
              <div className='regi_line'>
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
                  name='last_name'
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
                  <select name='bDay' id=''>
                    <option value=''>15</option>
                  </select>
                  <select name='bMonth' id=''>
                    <option value=''>15</option>
                  </select>
                  <select name='bYear' id=''>
                    <option value=''>15</option>
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
