import React, { useEffect, useState } from 'react';
import { getBookings } from '../../redux/api';
import DashboardTable from './DashboardTable';
import searchIcon from '../../images/searchIcon.svg';
import '../../styles/DashboardPage.css';

const DashboardPage = () => {
  const [bookingList, setBookingList] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [boolVal, setBoolVal] = useState(false);

  const fetchBookings = async () => {
    try {
      const { data } = await getBookings();
      // console.log(data);
      setBookingList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!boolVal) {
      fetchBookings();
      setBoolVal(true);
    }
  }, [boolVal]);

  const handleFilter = async () => {
    try {
      let dateQuery = searchDate;
      // if (searchDate !== '') {
      //   const dateInfo = new Date(searchDate);
      //   const res = `${dateInfo.getFullYear()}-${
      //     dateInfo.getMonth() + 1 > 9
      //       ? dateInfo.getMonth() + 1
      //       : `0${dateInfo.getMonth() + 1}`
      //   }`;
      //   dateQuery = res;
      // }
      // console.log(dateQuery);
      const { data } = await getBookings(searchInput, dateQuery);
      // console.log(data);
      setBookingList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeDate = (e) => {
    // console.log(e.target.value);
    setSearchDate(e.target.value);
  };

  return (
    <div className='dashboard-container'>
      <div className='dashboard-cards'></div>
      <div className='dashboard-firstSection'>
        <div className='dashboard-searchDiv'>
          <img src={searchIcon} alt='search' className='searchIcon' />
          <input
            type='text'
            placeholder='Ex. Order Id, Aspirant, Professional'
            className='dashboard-searchInput'
            id='searchInput'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
          />
        </div>
        <div className='dashboard-dateDiv'>
          <input
            className='dashboard-dateInput'
            type='month'
            onChange={handleChangeDate}
            value={searchDate}
            onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
          />
          <button className='dashboard-dateSearchBtn' onClick={handleFilter}>
            <img src={searchIcon} alt='search' className='searchBtnIcon' />
          </button>
        </div>
      </div>
      <div className='dashboard-tableSection'>
        <DashboardTable bookingList={bookingList} />
      </div>
    </div>
  );
};

export default DashboardPage;
