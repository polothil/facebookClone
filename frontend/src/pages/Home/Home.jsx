import React, { useRef } from 'react';
import Header from '../../components/Header/Header';
import useClickOutside from '../../helpers/useClickOutside';

const Home = () => {
  const el = useRef(null);
  useClickOutside(el, () => {
    el.current.style.display = 'none';
  });
  return (
    <div>
      <Header />
      <div className='card' ref={el}></div>
    </div>
  );
};

export default Home;
