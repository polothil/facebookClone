import React from 'react';
import { useSelector } from 'react-redux';
import CreatePost from '../../components/CreatePost/CreatePost';
import Header from '../../components/Header/Header';
import LeftHome from '../../components/Home/LeftHome/LeftHome';
import RightHome from '../../components/Home/RightHome/RightHome';
import Stories from '../../components/Home/Stories/Stories';

import './Home.css';

const Home = () => {
  const { user } = useSelector((user) => ({ ...user }));
  return (
    <div className='home'>
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

export default Home;
