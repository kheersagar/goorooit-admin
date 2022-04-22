import React, { useState, useEffect } from 'react';
import searchIcon from '../../images/searchIcon.svg';

import { getAllQuestions } from '../../redux/api';

import '../../styles/EmployeePage.css';
import { Fragment } from 'react';
import AllQuestionsTable from './AllQuestionsTable';
import BasicSelect from '../Select/BasicSelect';

const AllQuestions = () => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [boolVal, setBoolVal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [sortedValue, setSortedValue] = useState([]);

  const fetchGuruList = async () => {
    setLoading(true);
    try {
      const { data } = await getAllQuestions();
      console.log(data);
      console.log(data.questions);
      setAllQuestions(data.questions);
      setSortedValue(data.questions)
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (!boolVal) {
      fetchGuruList();
      setBoolVal(true);
    }
  }, [boolVal]);

  // const handleFilter = async () => {
  //   setLoading(true);
  //   try {
  //     const { data } = await getProfessionals(searchInput);
  //     // console.log(data);
  //     setProfessionalList(data);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // };
  function filter(value,key){
    if(value == 0){
      const res = sortedValue.sort((a, b) => {
        if (new Date(a[key]) < new Date( b[key])) return -1;
        return 0;
      });
      setSortedValue([...res]);
    }
    else{
      const res = sortedValue.sort((a, b) => {
        if (new Date(a[key]) > new Date( b[key])) return -1;
        return 0;
      });
      setSortedValue([...res]);
    }
  }
  const valuesArr = [
    "Date: Newest First",
    "Date: Newest Last",
  ];
  function sort(value) {
    console.log(value);
    switch (value) {
      case valuesArr[0]:
        filter(0, "date");
        break;
      case valuesArr[1]:
        filter(1, "date");
        break;
    }
  }
  return (
    <div className='employee-container'>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <Fragment>
          <div className='employee-firstSection'>
            {/* <div className='employee-searchDiv'>
              <img src={searchIcon} alt='search' className='searchIcon' />
              <input
                type='text'
                placeholder='Ex. Gurus'
                className='employee-searchInput'
                id='searchInput'
                // value={searchInput}
                // onChange={(e) => setSearchInput(e.target.value)}
                // onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
              />
            </div> */}
            <div>
              <BasicSelect
                handleChange={sort}
                values={valuesArr}
                label="Sort"
              />
            </div>

            {/* <div className='employee-filterDiv'>
              <button className='employee-filterBtn'>
                <img
                  src={filterIcon}
                  alt='print'
                  className='employee-filterIcon'
                />
                <span>Filter</span>
              </button>
            </div> */}
          </div>
          <div className='employee-tableSection'>
              <AllQuestionsTable questions={sortedValue}/>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default AllQuestions;
