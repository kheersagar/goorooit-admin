import React, { useState, useEffect } from "react";
import searchIcon from "../../images/searchIcon.svg";
import UserTable from "./UserTable";

import { getUsers } from "../../redux/api";

import "../../styles/ArtistPage.css";
import BasicSelect from "../Select/BasicSelect";

const UserPage = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [sortedValue, setSortedValue] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [boolVal, setBoolVal] = useState(false);

  const fetchAspirants = async () => {
    try {
      const { data } = await getUsers();
      // console.log(data);
      setAllUsers(data.gurus);
      setSortedValue(data.gurus);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!boolVal) {
      fetchAspirants();
      setBoolVal(true);
    }
  }, [boolVal]);

  const handleFilter = async () => {
    try {
      const { data } = await getUsers(searchInput);
      console.log(data);
      // setAllUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  function filter(value, key) {
    if (value === 0) {
      const res = sortedValue.sort((a, b) => {
        return a[key].toLowerCase().localeCompare(b[key].toLowerCase());
      });
      setSortedValue([...res]);
      console.log(res);
    } else {
      const res = sortedValue.sort((a, b) => {
        return b[key].toLowerCase().localeCompare(a[key].toLowerCase());
      });
      setSortedValue([...res]);
      console.log(res);
    }
  }

  const valuesArr = ["Name: A to Z", "Name: Z to A"];
  function sort(value) {
    console.log(value);
    switch (value) {
      case valuesArr[0]:
        filter(0, "name");
        break;
      case valuesArr[1]:
        filter(1, "name");
        break;
    }
  }
  return (
    <div className="artist-container">
      <div className="artist-firstSection">
        {/* <div className='artist-searchDiv'>
          <img src={searchIcon} alt='search' className='searchIcon' />
          <input
            type='text'
            placeholder='Ex. User'
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
      <div className="artist-tableSection">
        <UserTable allUsers={sortedValue} />
      </div>
    </div>
  );
};

export default UserPage;
