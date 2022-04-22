import React, { useState, useEffect } from "react";
import moment from "moment";
import searchIcon from "../../images/searchIcon.svg";
import { getAllBidPurchase } from "../../redux/api";
import "../../styles/ArtistsTable.css";
import BasicSelect from "../Select/BasicSelect";

const BidPurchase = () => {
  const [allBidPurchase, setAllBidPurchase] = useState([]);
  const [sortedValue, setSortedValue] = useState([]);
  const [boolVal, setBoolVal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const fetchList = async () => {
    setLoading(true);
    try {
      const { data } = await getAllBidPurchase();
      console.log(data.myAllEvents);
      setAllBidPurchase(data.myAllEvents);
      setSortedValue(data.myAllEvents);
      setLoading(false);
    } catch (error) {
      alert("Something went wrong, please try later");
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!boolVal) {
      fetchList();
      setBoolVal(true);
    }
  }, [boolVal]);

  const handleFilter = async () => {
    // try {
    //   const { data } = await getEventTransList(searchInput);
    //   // console.log(data);
    //   setAllBidPurchase(data);
    // } catch (error) {
    //   console.log(error);
    // }
  };
  function sortData(value, key) {
    if (value === 0) {
      const res = sortedValue.sort((a, b) => {
        return a.guru[key]
          .toLowerCase()
          .localeCompare(b.guru[key].toLowerCase());
      });
      setSortedValue([...res]);
    } else if (value === 1) {
      const res = sortedValue.sort((a, b) => {
        return b.guru[key]
          .toLowerCase()
          .localeCompare(a.guru[key].toLowerCase());
      });
      setSortedValue([...res]);
    } else if (value === 2) {
      const res = sortedValue.sort((a, b) => {
        if (new Date(a[key]) < new Date(b[key])) return -1;
        return 0;
      });
      setSortedValue([...res]);
    } else if (value === 3) {
      const res = sortedValue.sort((a, b) => {
        if (new Date(a[key]) > new Date(b[key])) return -1;
        return 0;
      });
      setSortedValue([...res]);
    } else if (value === 4) {
      const res = sortedValue.sort((a, b) => {
        if (a.guru[key] < b.guru[key]) return -1;
        return 0;
      });
      setSortedValue([...res]);
      console.log(res);
    } else if (value === 5) {
      const res = sortedValue.sort((a, b) => {
        if (a.guru[key] > b.guru[key]) return -1;
        return 0;
      });
      setSortedValue([...res]);
      console.log(res);
    }
  }

  const valuesArr = [
    "Name: A to Z",
    "Name: Z to A",
    "Date: Newsest First",
    "Date: Newsest Last",
    "Booking Price: Low to High",
    "Booking Price: High to Low",
  ];
  function sort(value) {
    console.log(value);
    switch (value) {
      case valuesArr[0]:
        sortData(0, "name");
        break;
      case valuesArr[1]:
        sortData(1, "name");
        break;
      case valuesArr[2]:
        sortData(2, "date");
        break;
      case valuesArr[3]:
        sortData(3, "date");
        break;
      case valuesArr[4]:
        sortData(4, "bookingPrice");
        break;
      case valuesArr[5]:
        sortData(5, "bookingPrice");
        break;
    }
  }
  return (
    <div>
      <div style={{ width: "90%", margin: "auto", marginTop: "4rem" }}>
        {loading ? (
          <h3>Loading...</h3>
        ) : (
          <>
            <h2>Bid Purchase</h2>
            <div className="artist-firstSection">
              {/* <div className="artist-searchDiv">
          <img src={searchIcon} alt="search" className="searchIcon" />
          <input
            type="text"
            placeholder="Ex. Event, Aspirant, Order Id"
            className="artist-searchInput"
            id="searchInput"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleFilter()}
          />
        </div> */}
              <BasicSelect
                handleChange={sort}
                values={valuesArr}
                label="Sort"
              />
              {/* <div className='artist-filterDiv'>
          <button className='artist-filterBtn'>
            <img src={filterIcon} alt='print' className='artist-filterIcon' />
            <span>Filter</span>
          </button>
        </div> */}
            </div>
            <div className="table-wrapper" id="#scrollBar">
              <table className="fl-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Guru Name</th>
                    <th>Email</th>
                    <th>Level</th>
                    <th>Booking Price</th>
                    <th>Questions Remaining</th>
                    <th>Order ID</th>
                    <th>Amount</th>
                    <th>Bids</th>
                    <th>Payment ID</th>
                    <th>Date</th>
                    {/* {<th>Action</th>} */}
                  </tr>
                </thead>
                <tbody>
                  {sortedValue?.map((bid) => (
                    <tr key={bid._id}>
                      <td className="cursor">{bid._id}</td>
                      <td className="cursor">{bid.guru.name}</td>
                      <td className="cursor">{bid.guru.email}</td>
                      <td className="cursor">{bid.guru.level}</td>
                      <td className="cursor">{bid.guru.bookingPrice}</td>
                      <td className="cursor">{bid.guru.questionsRemaining}</td>
                      <td className="cursor">{bid.orderId}</td>
                      <td className="cursor">{bid.amount}</td>
                      <td className="cursor">{bid.bids}</td>
                      <td className="cursor">{bid.paymentId}</td>
                      <td className="cursor">
                        {bid.date
                          ? moment(bid.date).format("MMMM Do YYYY, h:mm a")
                          : ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BidPurchase;
