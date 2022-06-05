import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import LeftHome from '../../components/Home/LeftHome/LeftHome';

const Home = () => {
  const { user } = useSelector((user) => ({ ...user }));
  return (
    <div>
      <Header />
      <LeftHome user={user} />
    </div>
  );
};

export default Home;
