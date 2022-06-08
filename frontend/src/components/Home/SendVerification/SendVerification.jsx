import React, { useState } from 'react';
import axios from 'axios';
import './SendVerification.css';

const SendVerification = ({ user }) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const sendVerificationLink = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/sendVerification`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setSuccess(data.message);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <div className='send_verification'>
      <span>
        Your account is not verified. Verify the account before it gets deleted after 30
        days of account creation.
      </span>
      <a onClick={() => sendVerificationLink()}>
        Click here to resend verification link.
      </a>
      {success && <span className='success_text'>{success}</span>}
      {error && <span className='error_text'>{error}</span>}
    </div>
  );
};

export default SendVerification;
