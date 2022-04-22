import React, { useState, useEffect } from 'react';
import moment from 'moment';
import searchIcon from '../../images/searchIcon.svg';
import { getEventTransList } from '../../redux/api';
import '../../styles/ArtistsTable.css';
import BasicSelect from '../Select/BasicSelect';

const EventTransactionTable = () => {
  const [allTransaction, setAllTransaction] = useState([]);
  const [boolVal, setBoolVal] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [sortedValue, setSortedValue] = useState([]);

  const fetchList = async () => {
    try {
      const { data } = await getEventTransList();
      console.log(data.eventTransactions);
      setAllTransaction(data.eventTransactions);
      setSortedValue(data.eventTransactions)
    } catch (error) {
      alert('Something went wrong, please try later');
      console.log(error);
    }
  };

  useEffect(() => {
    if (!boolVal) {
      fetchList();
      setBoolVal(true);
    }
  }, [boolVal]);

  const handleFilter = async () => {
    try {
      const { data } = await getEventTransList(searchInput);
      // console.log(data);
      setAllTransaction(data);
    } catch (error) {
      console.log(error);
    }
  };
  function filter(value,key) {
    if(value === 0){
      const res = sortedValue.sort((a, b) => {
        if (a[key] < b[key]) return -1;
        return 0;
      });
      setSortedValue([...res]);
    }
    else if(value === 1){
      const res = sortedValue.sort((a, b) => {
        if (a[key] > b[key]) return -1;
        return 0;
      });
      setSortedValue([...res]);
    }
    else if(value === 3){
      const res = sortedValue.sort((a, b) => {
        if (new Date(a[key]) > new Date( b[key])) return -1;
        return 0;
      });
      setSortedValue([...res]);
    }
    else{
      const res = sortedValue.sort((a, b) => {
        if (new Date(a[key]) < new Date( b[key])) return -1;
        return 0;
      });
      setSortedValue([...res]);
    }
  }

  const valuesArr = [
    "Amount: Low to High",
    "Amount: High to Low",
    "Date: Newest First",
    "Date: Newest Last",
  ];
  function sort(value) {
    console.log(value);
    switch (value) {
      case valuesArr[0]:
        filter(0, "amount");
        break;
      case valuesArr[1]:
        filter(1, "amount");
        break;
      case valuesArr[2]:
        filter(2, "Date");
        break;
      case valuesArr[3]:
        filter(3, "Date");
        break;
    }
  }
  return (
    <div style={{ width: '90%', margin: 'auto', marginTop: '4rem' }}>
      <h2>Event Transaction</h2>
      <div className='artist-firstSection'>
        {/* <div className='artist-searchDiv'>
          <img src={searchIcon} alt='search' className='searchIcon' />
          <input
            type='text'
            placeholder='Ex. Event, Aspirant, Order Id'
            className='artist-searchInput'
            id='searchInput'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
          />
        </div> */}
        <BasicSelect handleChange={sort} values={valuesArr} label="Sort" />

        {/* <div className='artist-filterDiv'>
          <button className='artist-filterBtn'>
            <img src={filterIcon} alt='print' className='artist-filterIcon' />
            <span>Filter</span>
          </button>
        </div> */}
      </div>
      <div className='table-wrapper' id='#scrollBar'>
        <table className='fl-table'>
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Event Title</th>
              <th>User</th>
              <th>Amount</th>
              <th>Txn Date</th>
              <th>Payment Status</th>
              {/* {<th>Action</th>} */}
            </tr>
          </thead>
          <tbody>
            {sortedValue?.map((trans) => (
              <tr key={trans._id}>
                <td className='cursor'>{trans.orderId ? trans.orderId : ''}</td>
                <td className='cursor'>
                  {trans?.event?.title ? trans?.event?.title : ''}
                </td>
                <td className='cursor'>
                  {trans?.user?.name ? trans?.user?.name : ''}
                </td>
                <td className='cursor'>{trans.amount ? trans.amount : ''}</td>
                <td className='cursor'>
                  {trans.Date
                    ? moment(trans.Date).format('MMMM Do YYYY, h:mm a')
                    : ''}
                </td>
                <td className='cursor'>{trans.status ? trans.status : ''}</td>
                {/**<td>
                <button
                  className='artist-blockBtn'
                  // onClick={() => blockOrUnblock(artist.artistId)}
                >
                  {'Approved'}
                </button>
              </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventTransactionTable;
