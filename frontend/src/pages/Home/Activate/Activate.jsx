import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CreatePost from '../../../components/CreatePost/CreatePost';
import Header from '../../../components/Header/Header';
import LeftHome from '../../../components/Home/LeftHome/LeftHome';
import RightHome from '../../../components/Home/RightHome/RightHome';
import Stories from '../../../components/Home/Stories/Stories';
import ActivateForm from './ActivateForm/ActivateForm';

const Activate = () => {
  const { user } = useSelector((user) => ({ ...user }));
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  return (
    <div className='home'>
      {success && (
        <ActivateForm
          type='success'
          header='Account verification succeeded'
          text={success}
          loading={loading}
        />
      )}
      {error && (
        <ActivateForm
          type='error'
          header='Account verification failed'
          text={error}
          loading={loading}
        />
      )}
      <Header />
      <LeftHome user={user} />
      <div className='home_middle'>
        <Stories />
        <CreatePost user={user} />
      </div>
      <RightHome user={user} />
    </div>
  );
};

export default Activate;
