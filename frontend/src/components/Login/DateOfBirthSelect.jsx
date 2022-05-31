import React from 'react';
import { useMediaQuery } from 'react-responsive';

const DateOfBirthSelect = ({ bDay, bMonth, bYear, dateError, handleRegisterChange }) => {
  const years = Array.from(
    new Array(108),
    (val, index) => new Date().getFullYear() - index
  );
  const months = Array.from(new Array(12), (val, index) => 1 + index);
  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };
  const days = Array.from(new Array(getDays()), (val, index) => 1 + index);

  // const view1 = useMediaQuery({ query: '(min-width: 539px' });
  // const view2 = useMediaQuery({ query: '(min-width: 850px' });
  const view3 = useMediaQuery({ query: '(min-width: 1170px' });

  return (
    <div
      className='reg_grid'
      style={{ marginBottom: `${dateError && !view3 ? '90px' : '0'}` }}
    >
      <select name='bDay' id='bDay' value={bDay} onChange={handleRegisterChange}>
        {days.map((day, index) => (
          <option value={day} key={index}>
            {day}
          </option>
        ))}
      </select>
      <select name='bMonth' id='bMonth' value={bMonth} onChange={handleRegisterChange}>
        {months.map((month, index) => (
          <option value={month} key={index}>
            {month}
          </option>
        ))}
      </select>
      <select name='bYear' id='bYear' value={bYear} onChange={handleRegisterChange}>
        {years.map((year, index) => (
          <option value={year} key={index}>
            {year}
          </option>
        ))}
      </select>
      {dateError && (
        <div className={!view3 ? 'input_error' : 'input_error input_error_select_large'}>
          <div className={!view3 ? 'error_arrow_bottom' : 'error_arrow_left'}></div>
          {dateError}
        </div>
      )}
    </div>
  );
};

export default DateOfBirthSelect;
