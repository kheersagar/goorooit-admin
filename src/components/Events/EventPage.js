import React, { useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import addIcon from "../../images/addIcon.svg";
// import printIcon from '../../images/printIcon.svg';
import filterIcon from "../../images/filterIcon.svg";
import searchIcon from "../../images/searchIcon.svg";
// import LoadingPage from '../utils/LoadingPage';
import { getEventList } from "../../redux/api";

import "../../styles/ArtistPage.css";
import BasicSelect from "../Select/BasicSelect";
import EventsTable from "./EventsTable";

const EventPage = () => {
  const history = useHistory();
  const [eventList, setEventList] = useState([]);
  const [boolVal, setBoolVal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [sortedValue, setSortedValue] = useState([]);

  const fetchEventList = async () => {
    setLoading(true);
    try {
      const { data } = await getEventList();
      console.log(data.events);
      setEventList(data.events);
      setSortedValue(data.events)
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (!boolVal) {
      fetchEventList();
      setBoolVal(true);
    }
  }, [boolVal]);

  const handleFilter = async () => {
    setLoading(true);
    try {
      const { data } = await getEventList(searchInput);
      setEventList(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  function filterData(value,key){
    if(value === 0){
      const res = eventList.filter((item)=>{
        if(item[key] !== 'open') return false;
        return true;
      });
      setSortedValue(res);
    }else{
      const res = eventList.filter((item)=>{
        if(item[key] !== 'close') return false;
        return true;
      });
      setSortedValue(res);
    }
  }
  function filter(value) {
    switch (value) {
      case filterValuesArr[0]:
        filterData(0,'status');
        break;
      case filterValuesArr[1]:
        filterData(1,'status');
        break;
      case filterValuesArr[2]:
        setSortedValue([...eventList]);
        break;
    }
  }
  function sortData(value,key) {
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
    else if(value === 2){
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
  const filterValuesArr =['Status: Open','Status: Close','Reset']
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
        sortData(0, "price");
        break;
      case valuesArr[1]:
        sortData(1, "price");
        break;
      case valuesArr[2]:
        sortData(2, "date");
        break;
      case valuesArr[3]:
        sortData(3, "date");
        break;
    }
  }
  return (
    <div className="artist-container">
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <Fragment>
        <div className="employee-firstSection">
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
            </div>
          {/* <div className="artist-firstSection">
            <div className='artist-searchDiv'>
              <img src={searchIcon} alt='search' className='searchIcon' />
              <input
                type='text'
                placeholder='Ex. Event'
                className='artist-searchInput'
                id='searchInput'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
              />
            </div>

            <div className="artist-addArtistDiv">
              <button
                className='artist-addBtn'
                onClick={() => history.push('/events/add')}
              >
                <img src={addIcon} alt='add' className='artist-addIcon' />
                <span>Add event</span>
              </button>
            </div>
          </div> */}
          <div className="artist-tableSection">
            <EventsTable
              eventList={sortedValue}
              fetchEventList={fetchEventList}
            />
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default EventPage;
