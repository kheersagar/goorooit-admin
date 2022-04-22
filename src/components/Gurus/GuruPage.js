import React, { useState, useEffect } from "react";
import searchIcon from "../../images/searchIcon.svg";
import GurusTable from "./GurusTable";

import { getGurus } from "../../redux/api";

import "../../styles/EmployeePage.css";
import { Fragment } from "react";
import BasicSelect from "../Select/BasicSelect";

const GuruPage = () => {
  const [guruList, setGuruList] = useState([]);
  const [sortedValue, setSortedValue] = useState([]);
  const [boolVal, setBoolVal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const fetchGuruList = async () => {
    setLoading(true);
    try {
      const { data } = await getGurus();
      console.log(data.gurus);
      setGuruList(data.gurus);
      setSortedValue(data.gurus);
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
  function TEFilter(value) {
    if (value === 6) {
      return setSortedValue([...guruList]);
    } else if (value === 0) {
      const res = guruList.filter((item) => {
        if ((item.totalExperience || 0) !== 0) return false;
        return true;
      });
      setSortedValue([...res]);
    } else {
      const res = guruList.filter((item) => {
        if ((item.totalExperience || 0) < value) return false;
        return true;
      });
      setSortedValue([...res]);
    }
  }

  function TELowToHigh() {
    const res = sortedValue.sort((a, b) => {
      console.log((a.totalExperience || 0) < (b.totalExperience || 0));
      if ((a.totalExperience || 0) < (b.totalExperience || 0)) {
        return -1;
      }
      return 0;
    });
    setSortedValue([...res]);
  }
  function TEHighToLow() {
    const res = sortedValue.sort((a, b) => {
      console.log((a.totalExperience || 0) < (b.totalExperience || 0));
      if ((a.totalExperience || 0) > (b.totalExperience || 0)) {
        return -1;
      }
      return 0;
    });
    setSortedValue([...res]);
  }
  function RLowToHigh() {
    const res = sortedValue.sort((a, b) => {
      console.log((a.rating || 0) < (b.rating || 0));
      if ((a.rating || 0) < (b.rating || 0)) {
        return -1;
      }
      return 0;
    });
    setSortedValue([...res]);
  }
  function RHighToLow() {
    const res = sortedValue.sort((a, b) => {
      console.log((a.rating || 0) < (b.rating || 0));
      if ((a.rating || 0) > (b.rating || 0)) {
        return -1;
      }
      return 0;
    });
    setSortedValue([...res]);
  }
  const valuesArr = [
    "Total Experience: Low to High",
    "Total Experience: High to Low",
    "Rating:Low to High",
    "Rating:High to Low",
  ];
  const filterValuesArr = [
    "Total Experience: 0",
    "Total Experience: 1+",
    "Total Experience: 2+",
    "Total Experience: 3+",
    "Total Experience: 4+",
    "Total Experience: 5+",
    "ALL",
  ];

  function sort(value) {
    console.log(value);
    switch (value) {
      case valuesArr[0]:
        TELowToHigh();
        break;
      case valuesArr[1]:
        TEHighToLow();
        break;
      case valuesArr[2]:
        RLowToHigh();
        break;
      case valuesArr[3]:
        RHighToLow();
        break;
    }
  }

  function filter(value) {
    switch (value) {
      case filterValuesArr[0]:
        TEFilter(0);
        break;
      case filterValuesArr[1]:
        TEFilter(1);
        break;
      case filterValuesArr[2]:
        TEFilter(2);
        break;
      case filterValuesArr[3]:
        TEFilter(3);
        break;
      case filterValuesArr[4]:
        TEFilter(4);
        break;
      case filterValuesArr[5]:
        TEFilter(5);
        break;
      case filterValuesArr[6]:
        TEFilter(6);
        break;
    }
  }
  return (
    <div className="employee-container">
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <Fragment>
          <div className="employee-firstSection">
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
            <div>
              <BasicSelect
                handleChange={filter}
                values={filterValuesArr}
                label="Filter"
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
          <div className="employee-tableSection">
            <GurusTable guruList={sortedValue} fetchGuruList={fetchGuruList} />
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default GuruPage;
