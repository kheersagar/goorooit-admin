import React, { useState, useEffect } from 'react';
import searchIcon from '../../images/searchIcon.svg';
import PaymentsTable from './PaymentsTable';
import '../../styles/PaymentPage.css';
import { getTransactions } from '../../redux/api';
import BasicSelect from '../Select/BasicSelect';

const PaymentPage = () => {
  const [allPayments, setAllPayments] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [boolVal, setBoolVal] = useState(false);
  const [sortedValue, setSortedValue] = useState([]);

  const fetchPaymentList = async () => {
    try {
      const { data } = await getTransactions();
      console.log(data.transactions);
      setAllPayments(data.transactions);
      setSortedValue(data.transactions)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!boolVal) {
      fetchPaymentList();
      setBoolVal(true);
    }
  }, [boolVal]);
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
        filter(0, "amountPaid");
        break;
      case valuesArr[1]:
        filter(1, "amountPaid");
        break;
      case valuesArr[2]:
        filter(2, "txnDate");
        break;
      case valuesArr[3]:
        filter(3, "txnDate");
        break;
    }
  }
  const handleFilter = async () => {
    try {
      let dateQuery = searchDate;
      const { data } = await getTransactions(searchInput, dateQuery);
      // console.log(data);
      setAllPayments(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeDate = (e) => {
    setSearchDate(e.target.value);
  };

  return (
    <div className='payment-container'>
      <div className='payment-firstSection'>
        {/* <div className='payment-searchDiv'>
          <img src={searchIcon} alt='search' className='searchIcon' />
          <input
            type='text'
            placeholder='Ex. Transaction ID, Aspirant, Professional'
            className='payment-searchInput'
            id='searchInput'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
          />
        </div> */}
        <BasicSelect handleChange={sort} values={valuesArr} label="Sort" />

        {/* <div className='payment-dateDiv'>
          <input
            className='payment-dateInput'
            type='month'
            onChange={handleChangeDate}
            value={searchDate}
            onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
          />
          <button className='payment-dateSearchBtn' onClick={handleFilter}>
            <img src={searchIcon} alt='search' className='searchBtnIcon' />
          </button>
        </div> */}
      </div>
      <div className='payment-tableSection'>
        <PaymentsTable allPayments={sortedValue} />
      </div>
    </div>
  );
};

export default PaymentPage;
