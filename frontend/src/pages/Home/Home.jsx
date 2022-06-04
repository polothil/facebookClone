import React, { useRef } from 'react';
import Header from '../../components/Header/Header';
import ClickOutside from '../../helpers/ClickOutside';

const Home = () => {
  const el = useRef(null);
  ClickOutside(el, () => {
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
